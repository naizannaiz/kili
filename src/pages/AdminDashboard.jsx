import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, LogOut, Package, Image as ImageIcon, Tag, IndianRupee, Upload, X, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        cat: '',
        price: '',
        description: '',
        img: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setProducts(data);
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
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image!');
            setUploading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        setFormData({ ...formData, img: publicUrl });
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (editingProduct) {
            const { error } = await supabase
                .from('products')
                .update(formData)
                .eq('id', editingProduct.id);
        } else {
            const { error } = await supabase
                .from('products')
                .insert([formData]);
        }

        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ name: '', cat: '', price: '', description: '', img: '' });
        setImagePreview('');
        fetchProducts();
    };

    const handleDelete = async (product) => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            setLoading(true);

            // Delete image from storage if it exists
            if (product.img && product.img.includes('product-images')) {
                const fileName = product.img.split('/').pop();
                await supabase.storage
                    .from('product-images')
                    .remove([fileName]);
            }

            // Delete product from database
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', product.id);

            if (error) {
                alert('Error deleting product');
            }

            fetchProducts();
            setLoading(false);
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            cat: product.cat,
            price: product.price,
            description: product.description,
            img: product.img
        });
        setImagePreview(product.img);
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
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setFormData({ name: '', cat: '', price: '', description: '', img: '' });
                                setImagePreview('');
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
                        >
                            <Plus size={20} /> Add Product
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-white text-slate-600 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
                        >
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                {loading && products.length === 0 ? (
                    <div className="flex justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Package size={40} />
                        </div>
                        <h2 className="text-2xl font-serif text-slate-900 mb-2">Your Catalog is Empty</h2>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">Start building your digital heritage collection by adding your first handwoven product.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                        >
                            <Plus size={20} /> Add Your First Product
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group"
                            >
                                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => openEditModal(product)}
                                            className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-md text-slate-600 hover:text-primary transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product)}
                                            className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-md text-slate-600 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{product.cat}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <p className="text-slate-500 text-sm line-clamp-1">{product.description}</p>
                                        <p className="text-lg font-bold text-slate-900">{product.price}</p>
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
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                                            <Package size={16} /> Product Name
                                        </label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                                            placeholder="e.g. Padma Yoga Mat"
                                        />
                                    </div>
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
                                            placeholder="e.g. ₹4,500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <ImageIcon size={16} /> Product Image
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
                                        disabled={loading}
                                        className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
