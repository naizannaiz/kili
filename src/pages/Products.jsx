import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabase';

const Products = () => {
    const [filter, setFilter] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Yoga & Meditation', 'Home Decor', 'Custom Heirloom Mats'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const filteredProducts = filter === 'All' ? products : products.filter(p => p.cat === filter);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="products-page"
        >
            <main className="container py-32">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-7xl text-primary mb-4">The Collection</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Discover the intricate patterns and artisanal quality of authentic Kora Grass Mats, handwoven by the masters of Killimangalam.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 border-b border-primary/10 mb-12 pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all tracking-wide uppercase ${filter === cat ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary hover:border-primary/40'}`}
                        >
                            {cat === 'All' ? 'All' : cat.split(' ')[0]}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map(product => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={product.id}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-100 mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <button className="bg-white/80 backdrop-blur rounded-full p-2 text-primary hover:bg-white transition-colors">
                                            <span className="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-serif text-2xl text-slate-900 mb-1">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 font-medium">{product.description}</p>
                                    <p className="text-lg font-bold text-primary">{product.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Custom Heirloom Banner */}
                <section className="relative rounded-2xl overflow-hidden mb-24 min-h-[500px] flex items-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] hover:scale-105"
                        style={{
                            backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrgzNr-XHGUpBbcxMOYQo77wfQFfrJy6OshoAjBaGfFWuwcFpySGkzTG71WBIJLQ-Po3Q1qVcLMbZJvi4CrVj2pUOb8AlxVT2RPAQ7a1rLPoRlWdY8Y_L_N2uoju30AA08MTdVkwd8ROUbUfItB8HGdNQzOaABJC7qYTl8ZBtDh2kraNQAb-8NciIimVHi5H5RxWaz6IJCkFHq-b6rBHSP2oqtamdYkXsKt0yjbnTAcbzsZyHPM2YYVrsf4wrV-pCsgsJ6x3mNUqU')"
                        }}
                    ></div>
                    <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl text-white">
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/30 backdrop-blur-sm text-sm font-bold tracking-widest uppercase mb-6 border border-white/20">Bespoke Craft</span>
                        <h2 className="font-serif text-4xl md:text-6xl mb-6">Design Your Own Heritage</h2>
                        <p className="text-lg md:text-xl font-light mb-10 opacity-90 leading-relaxed">
                            Your Story, Our Craft. Work directly with our master weavers to create a custom heirloom mat that reflects your personal journey and style.
                        </p>
                        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg flex items-center gap-3">
                            Start Customizing
                            <span className="material-symbols-outlined">edit_note</span>
                        </button>
                    </div>
                </section>

                {/* Care Instructions Section */}
                <section className="bg-primary/5 rounded-2xl p-8 md:p-16 border border-primary/10">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2">Preserving the Weave</h2>
                        <p className="text-slate-600">Simple steps to ensure your Kora Grass mat lasts for generations.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                        {[
                            {
                                icon: "air",
                                title: "Dust Regularly",
                                desc: "Simply shake the mat or use a soft brush to remove dust from the intricate weave fibers."
                            },
                            {
                                icon: "water_drop",
                                title: "Avoid Dampness",
                                desc: "Keep away from direct water contact. If spilled, wipe immediately and air-dry completely."
                            },
                            {
                                icon: "sunny",
                                title: "Sun Dry Occasionally",
                                desc: "Expose to gentle morning sunlight once a month to maintain fiber flexibility and natural aroma."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <h4 className="font-bold text-lg text-slate-900">{item.title}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </motion.div>
    );
};

export default Products;
