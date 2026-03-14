import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, LogOut, Package, Image as ImageIcon, Tag, IndianRupee, Upload, X, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFlushModalOpen, setIsFlushModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingAchievement, setEditingAchievement] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        cat: '',
        price: '',
        product_number: '',
        description: '',
        img: '',
        length: '',
        width: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchAchievements();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'whatsapp_number')
            .single();

        if (data) setWhatsappNumber(data.value);
    };

    const handleUpdateWhatsApp = async () => {
        setIsSavingSettings(true);
        const { error } = await supabase
            .from('site_settings')
            .update({ value: whatsappNumber })
            .eq('key', 'whatsapp_number');

        if (error) {
            alert('Error updating WhatsApp number');
        } else {
            alert('WhatsApp number updated successfully!');
        }
        setIsSavingSettings(false);
    };

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setProducts(data);
        setLoading(false);
    };

    const fetchAchievements = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('achievements')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setAchievements(data);
        setLoading(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setUploading(true);
        try {
            // Compress image before upload
            const options = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1200,
                useWebWorker: true,
                initialQuality: 0.8
            };

            const compressedFile = await imageCompression(file, options);

            const fileExt = compressedFile.name.split('.').pop() || 'jpg';
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from(activeTab === 'products' ? 'product-images' : 'achievement-images')
                .upload(filePath, compressedFile);

            if (uploadError) {
                console.error('Supabase upload error:', uploadError);
                alert(`Error uploading image: ${uploadError.message}`);
                setUploading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(activeTab === 'products' ? 'product-images' : 'achievement-images')
                .getPublicUrl(filePath);

            setFormData({ ...formData, img: publicUrl });
        } catch (error) {
            console.error('Compression error:', error);
            alert('Failed to process image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (activeTab === 'products') {
            if (editingProduct) {
                await supabase
                    .from('products')
                    .update(formData)
                    .eq('id', editingProduct.id);
            } else {
                await supabase
                    .from('products')
                    .insert([formData]);
            }
            fetchProducts();
        } else {
            const achievementData = {
                title: formData.name,
                description: formData.description,
                image_url: formData.img
            };
            if (editingAchievement) {
                await supabase
                    .from('achievements')
                    .update(achievementData)
                    .eq('id', editingAchievement.id);
            } else {
                await supabase
                    .from('achievements')
                    .insert([achievementData]);
            }
            fetchAchievements();
        }

        setIsModalOpen(false);
        setEditingProduct(null);
        setEditingAchievement(null);
        setFormData({ name: '', cat: '', price: '', product_number: '', description: '', img: '', length: '', width: '' });
        setImagePreview('');
        setLoading(false);
    };

    const handleFlushStorage = async () => {
        setLoading(true);
        try {
            // 1. List all files in the bucket
            const { data: files, error: listError } = await supabase.storage
                .from('product-images')
                .list();

            if (listError) throw listError;

            if (files && files.length > 0) {
                // 2. Extract names (excluding any folders if they exist, but usually it's just files)
                const filesToRemove = files.map(file => file.name);

                // 3. Remove all files
                const { error: removeError } = await supabase.storage
                    .from('product-images')
                    .remove(filesToRemove);

                if (removeError) throw removeError;

                alert(`Successfully flushed ${filesToRemove.length} images from storage.`);
            } else {
                alert('Storage is already empty.');
            }
        } catch (error) {
            console.error('Flush error:', error);
            alert(`Error flushing storage: ${error.message}`);
        } finally {
            setIsFlushModalOpen(false);
            setLoading(false);
        }
    };

    const handleDelete = async (item) => {
        const table = activeTab === 'products' ? 'products' : 'achievements';
        const bucket = activeTab === 'products' ? 'product-images' : 'achievement-images';
        const name = activeTab === 'products' ? item.name : item.title;
        const img = activeTab === 'products' ? item.img : item.image_url;

        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            setLoading(true);

            // Delete image from storage if it exists
            if (img && img.includes(bucket)) {
                const fileName = img.split('/').pop();
                await supabase.storage
                    .from(bucket)
                    .remove([fileName]);
            }

            // Delete from database
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', item.id);

            if (error) {
                alert(`Error deleting ${activeTab === 'products' ? 'product' : 'achievement'}`);
            }

            if (activeTab === 'products') fetchProducts();
            else fetchAchievements();
            setLoading(false);
        }
    };

    const openEditModal = (item) => {
        if (activeTab === 'products') {
            setEditingProduct(item);
            setFormData({
                name: item.name,
                cat: item.cat,
                price: item.price,
                product_number: item.product_number || '',
                description: item.description,
                img: item.img,
                length: item.length || '',
                width: item.width || ''
            });
            setImagePreview(item.img);
        } else {
            setEditingAchievement(item);
            setFormData({
                name: item.title,
                cat: '',
                price: '',
                product_number: '',
                description: item.description,
                img: item.image_url,
                length: '',
                width: ''
            });
            setImagePreview(item.image_url);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="font-serif text-4xl text-slate-900 mb-2">Catalog Control</h1>
                        <p className="text-slate-500">Manage your heritage collection and inventory</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setEditingAchievement(null);
                                setFormData({ name: '', cat: '', price: '', product_number: '', description: '', img: '', length: '', width: '' });
                                setImagePreview('');
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
                        >
                            <Plus size={20} /> Add {activeTab === 'products' ? 'Product' : 'Achievement'}
                        </button>
                        <button
                            onClick={() => setIsFlushModalOpen(true)}
                            className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold border border-red-100 hover:bg-red-100 transition-all"
                            title="Clear all stored images"
                        >
                            <Trash2 size={20} /> Flush Storage
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-white text-slate-600 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
                        >
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl border border-slate-100 w-fit">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('achievements')}
                        className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'achievements' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Achievements
                    </button>
                </div>

                {/* Site Settings Section */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                <span className="material-symbols-outlined text-2xl">contact_support</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">WhatsApp Configuration</h2>
                                <p className="text-sm text-slate-500 text-left">Set the primary number for customer inquiries and orders</p>
                            </div>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <input
                                type="text"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                className="flex-1 md:w-64 px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                                placeholder="e.g. 919048911000"
                            />
                            <button
                                onClick={handleUpdateWhatsApp}
                                disabled={isSavingSettings}
                                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSavingSettings ? <Loader2 size={18} className="animate-spin" /> : 'Update Number'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {loading && (activeTab === 'products' ? products.length === 0 : achievements.length === 0) ? (
                    <div className="flex justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (activeTab === 'products' ? products.length === 0 : achievements.length === 0) ? (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            {activeTab === 'products' ? <Package size={40} /> : <ImageIcon size={40} />}
                        </div>
                        <h2 className="text-2xl font-serif text-slate-900 mb-2">No {activeTab} Found</h2>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">Start sharing your {activeTab} with your audience.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(activeTab === 'products' ? products : achievements).map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group"
                            >
                                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                                    <img
                                        src={activeTab === 'products' ? item.img : item.image_url}
                                        alt={activeTab === 'products' ? item.name : item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-md text-slate-600 hover:text-primary transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-md text-slate-600 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {activeTab === 'products' && <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{item.cat}</div>}
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {activeTab === 'products' ? item.name : item.title}
                                    </h3>
                                    {activeTab === 'products' && (
                                        <p className="text-xs text-slate-400 font-mono mb-2">
                                            ID: {item.product_number || item.id}
                                        </p>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <p className="text-slate-500 text-sm line-clamp-1">{item.description}</p>
                                        {activeTab === 'products' && <p className="text-lg font-bold text-slate-900">₹ {item.price}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="text-2xl font-serif text-slate-900">
                                    {activeTab === 'products' 
                                        ? (editingProduct ? 'Edit Product' : 'Add New Product')
                                        : (editingAchievement ? 'Edit Achievement' : 'Add New Achievement')
                                    }
                                </h2>
                                <button onClick={() => {
                                    setIsModalOpen(false);
                                    setImagePreview('');
                                }} className="text-slate-400 hover:text-slate-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            {activeTab === 'products' ? <Package size={16} /> : <ImageIcon size={16} />} 
                                            {activeTab === 'products' ? 'Product Name' : 'Achievement Title'}
                                        </label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                                            placeholder={activeTab === 'products' ? "e.g. Padma Yoga Mat" : "e.g. UNESCO Recognition"}
                                        />
                                    </div>
                                    {activeTab === 'products' && (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <Tag size={16} /> Category
                                                </label>
                                                <select
                                                    required
                                                    value={formData.cat}
                                                    onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all appearance-none bg-white"
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="Yoga & Meditation">Yoga & Meditation</option>
                                                    <option value="Home Decor">Home Decor</option>
                                                    <option value="Custom Heirloom Mats">Custom Heirloom Mats</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <IndianRupee size={16} /> Price
                                                </label>
                                                <input
                                                    required
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                                                    placeholder="e.g. 4,500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <Tag size={16} /> Product Number
                                                </label>
                                                <input
                                                    value={formData.product_number}
                                                    onChange={(e) => setFormData({ ...formData, product_number: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                                                    placeholder="e.g. PN-1001"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px]">straighten</span> Length
                                                </label>
                                                <input
                                                    value={formData.length}
                                                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                                                    placeholder="e.g. 6 ft"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px]">straighten</span> Width
                                                </label>
                                                <input
                                                    value={formData.width}
                                                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                                                    placeholder="e.g. 4 ft"
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <ImageIcon size={16} /> {activeTab === 'products' ? 'Product Image' : 'Cover Image'}
                                        </label>
                                        <div className="relative">
                                            {imagePreview ? (
                                                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview('');
                                                            setFormData({ ...formData, img: '' });
                                                        }}
                                                        className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur rounded-full text-slate-600 hover:text-red-500 shadow-sm"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-slate-50 transition-all cursor-pointer">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        {uploading ? (
                                                            <Loader2 size={24} className="animate-spin text-primary mb-2" />
                                                        ) : (
                                                            <Upload size={24} className="text-slate-400 mb-2" />
                                                        )}
                                                        <p className="text-sm text-slate-500 font-medium">Click to upload image</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        disabled={uploading}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Description</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all h-32"
                                        placeholder="Briefly describe the product..."
                                    />
                                </div>
                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-4 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || uploading}
                                        className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : activeTab === 'products' 
                                            ? (editingProduct ? 'Update Product' : 'Add Product')
                                            : (editingAchievement ? 'Update Achievement' : 'Add Achievement')
                                        }
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Flush Confirmation Modal */}
            <AnimatePresence>
                {isFlushModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                                <Trash2 size={40} />
                            </div>
                            <h2 className="text-2xl font-serif text-slate-900 mb-4">Flush Product Images?</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                This will <span className="text-red-600 font-bold underline">permanently delete all images</span> from Supabase Storage. <br /><br />
                                <span className="text-xs">Note: Database records will remain, but images will appear broken until re-uploaded.</span>
                            </p>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleFlushStorage}
                                    disabled={loading}
                                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Yes, Flush Everything'}
                                </button>
                                <button
                                    onClick={() => setIsFlushModalOpen(false)}
                                    className="w-full bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
