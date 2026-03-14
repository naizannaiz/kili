import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronLeft } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ALWAYS scroll to top when opening a new product page
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setProduct(data);
            }
            // Add error handling if product not found?
            setLoading(false);
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[#FAF9F6]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-[#FAF9F6]">
                <h2 className="text-3xl font-serif text-slate-800 mb-4">Product Not Found</h2>
                <button 
                    onClick={() => navigate('/products')}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold"
                >
                    <ChevronLeft size={20} />
                    Return to Collection
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-32 pb-24 bg-[#FAF9F6]"
        >
            <div className="container max-w-6xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-6 lg:mb-8 group w-fit"
                >
                    <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    Back to collection
                </button>

                <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl shadow-black/5 overflow-hidden border border-slate-100 flex flex-col lg:grid lg:grid-cols-2">
                    
                    {/* Left Side - Image Gallery */}
                    <div className="w-full h-80 sm:h-96 lg:h-auto bg-slate-100 relative">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-white/90 backdrop-blur px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm">
                            <span className="text-primary text-[10px] lg:text-xs font-bold uppercase tracking-widest">
                                {product.cat}
                            </span>
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
                        <p className="text-xs sm:text-sm text-slate-400 font-mono mb-2 lg:mb-3 uppercase tracking-wider">
                            ID: {product.product_number || product.id}
                        </p>
                        
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4 lg:mb-6 leading-tight">
                            {product.name}
                        </h1>
                        
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 lg:mb-10">
                            ₹ {product.price}
                        </p>
                        
                        <div className="prose prose-slate prose-base lg:prose-lg max-w-none mb-8 lg:mb-10">
                            <p className="text-slate-600 leading-relaxed font-light whitespace-pre-wrap">
                                {product.description}
                            </p>
                        </div>
                        
                        {(product.length || product.width) && (
                            <div className="mb-8 lg:mb-12">
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 lg:mb-4 border-b border-slate-100 pb-2">Dimensions</h4>
                                <div className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base text-slate-600 bg-slate-50 w-fit px-4 py-2 lg:px-5 lg:py-3 rounded-lg lg:rounded-xl border border-slate-100">
                                    <span className="material-symbols-outlined text-lg lg:text-xl text-slate-400">straighten</span>
                                    {product.length && `${product.length}`}
                                    {product.length && product.width && ' x '}
                                    {product.width && `${product.width}`}
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-auto pt-6 lg:pt-8 border-t border-slate-100">
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-primary text-white py-4 lg:py-5 rounded-lg lg:rounded-xl font-bold text-base lg:text-lg flex items-center justify-center gap-2 lg:gap-3 hover:bg-primary/90 transition-all shadow-md hover:shadow-xl active:scale-[0.98] group"
                            >
                                <ShoppingBag size={22} className="transition-transform group-hover:-rotate-12" />
                                Add to Basket
                            </button>
                            <div className="mt-5 lg:mt-6 flex flex-col space-y-2 lg:space-y-3">
                                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs sm:text-sm">
                                    <span className="material-symbols-outlined text-base lg:text-lg">verified</span>
                                    <span>Authentic Killimangalam Handloom</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs sm:text-sm text-center">
                                    <span className="material-symbols-outlined text-base lg:text-lg">local_shipping</span>
                                    <span>Safe & Traditional Hand-to-Hand Service</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;
