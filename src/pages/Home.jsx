import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useCart } from '../context/CartContext';
import chemicalDyeingImg from '../assets/chemical_dyeing_process.png';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAchievements, setLoadingAchievements] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchFeatured = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);

            if (data) setFeaturedProducts(data);
            setLoading(false);
        };

        const fetchAchievements = async () => {
            setLoadingAchievements(true);
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(6);

            if (data) setAchievements(data);
            setLoadingAchievements(false);
        };

        fetchFeatured();
        fetchAchievements();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-page"
        >
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden pt-20">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: "linear-gradient(to right, rgba(26, 13, 14, 0.9) 30%, rgba(26, 13, 14, 0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBysBgntm00iSkyCDT3GpJPSt99yQPmadbxiZlX44m33qaa9zXpbM26lFt4f895aVhvuZ3AGri4taSrPql0J5-c1eNw6EQV9Jk2e8cehoE7_fyz2Txi6J-k7F0VM1tGiF6LPsq9JNWOXGS1j-wvIZIflTWFsMnh17PuSb-rUHDWOTtW9mcVI2usLVr-idQTaISxzFHG4xiZvtIp_QQp5AJnBFzlXXIbwwvE2iZYDfbs_Ed-i3nUJgWvu_Wr5ThBosPc40xL9oG0cws')"
                    }}
                ></div>
                <div className="container relative z-10 w-full mt-12 pb-12 md:pb-0">
                    <div className="max-w-2xl space-y-6 md:space-y-8">
                        <span className="inline-block py-1 px-3 rounded bg-secondary/20 text-secondary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">35+ Year Heritage</span>
                        <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-serif font-black leading-[1.1] tracking-tight">
                            Weaving Heritage into <span className="text-primary italic">Luxury</span>
                        </h1>
                        <p className="text-slate-300 text-base md:text-xl font-light leading-relaxed max-w-lg">
                            Decades of traditional craftsmanship and eco-friendly elegance woven into every strand of Killimangalam പുൽപായ.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/products" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-base font-bold transition-all flex items-center justify-center gap-2">
                                Explore the Collection <ChevronRight size={20} />
                            </Link>
                            <a 
                                href="https://youtu.be/Bqw7YCvbL2c?si=B7pFWu-2HFlDuJaM" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="border border-white/20 hover:border-secondary/50 text-white px-8 py-4 rounded-lg text-base font-bold transition-all bg-white/5 backdrop-blur-sm flex items-center justify-center"
                            >
                                Watch The Film
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 right-12 hidden lg:flex items-center gap-4 text-white/40">
                    <div className="h-px w-20 bg-white/20"></div>
                    <span className="text-xs uppercase tracking-widest font-bold">Scroll to discover</span>
                </div>
            </section>

            {/* Quick Access Heritage Bar */}
            <section className="relative z-20 -mt-10 md:-mt-12 container">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl md:rounded-3xl p-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        { title: 'Our Heritage', path: '/about', icon: 'history_edu' },
                        { title: 'The Craft', path: '/craft', icon: 'precision_manufacturing' },
                        { title: 'Signature Shop', path: '/products', icon: 'shopping_bag' },
                        { title: 'Impact', path: '/impact', icon: 'diversity_3' },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className="group flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 py-6 md:py-8 px-4 rounded-xl md:rounded-2xl hover:bg-primary/5 transition-all duration-500"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <span className="material-symbols-outlined text-xl md:text-2xl">{item.icon}</span>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</div>
                                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 font-bold group-hover:text-slate-600">Explore</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>


            {/* Our Craft Section */}
            <section className="py-24 bg-bg-dark text-white">
                <div className="container">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase">The Process</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">The Art of the Looms</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                id: '01',
                                title: 'Harvesting',
                                desc: 'Sustainably gathering fine മുത്തങ്ങ പുല്ല് from the lush riverbanks, selected only during peak maturity.',
                                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOZyal-re8e58YmQtAKnN6mqgoImcuvdVtUNYFFpXCY8HwhinjiImQcf4LUmnyz1kslWyTgyVrO3srbvp9EPkIvyq1kITfpS8XMV63G7qaw8Var1qjenE3WnO_uadOEModPuhcpq_6WcqInq072ZXoGd3i69EO6PBIYpA2OjUP0IF4ymml9cK2sE9MbLeA8B6cTiXfAtXuUXDS533TGOPcJDLYZVOvSjSBXTcxt7Mj6AHv-SgwMUbFccIFru0qcd-iua0y4-jb5GI'
                            },
                            {
                                id: '02',
                                title: 'Vibrant Dyeing',
                                desc: 'Using high-quality synthetic dyes to achieve brilliant, long-lasting colors that resist fading over time.',
                                img: chemicalDyeingImg
                            },
                            {
                                id: '03',
                                title: 'Master Weaving',
                                desc: 'Intricate geometric patterns brought to life on traditional hand-operated looms by master weavers.',
                                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcgyNn8xEFTzXeg5ucIgD3mHxZbQkYh_djQgVFrP73tp9MGq8OMNno4TwtXRroNxm-FmcqrBOg6XBXtvVt8bqqDuau-5IiXITz8fXLkfsq-LGbMUZgSq0K7CfXM9kjhf8Dd1KptBHQbChVCnQMdK4t4bk7fvFC183UGuLdgwNfeZRPj294t8uNMIK5D1-dVcX-HypWJMSTNaSgVTK1Oe7XMPBsGKZvoAmnq-3XfWjGBAeKH5sgWdmceSZKBBeSOCN02LR1t8jxVxY'
                            }
                        ].map(step => (
                            <div key={step.id} className="group">
                                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 relative">
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img
                                        src={step.img}
                                        alt={step.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-3 flex items-center gap-3 text-white">
                                    <span className="text-secondary italic text-base font-sans">{step.id}</span> {step.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-serif font-bold text-slate-900">The Signature Collection</h2>
                            <p className="text-slate-500 max-w-md">Each mat is unique, bearing the signature of the weaver and the natural variation of the grass.</p>
                        </div>
                        <Link to="/products" className="text-primary font-bold flex items-center gap-2 group">
                            View Entire Gallery <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 size={32} className="animate-spin text-primary" />
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {featuredProducts.map((prod, i) => (
                                <div key={prod.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                                    <div className="aspect-[4/5] relative overflow-hidden bg-slate-50 image-pulse">
                                        <img
                                            src={prod.img}
                                            alt={prod.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                            onLoad={(e) => e.target.parentElement.classList.remove('image-pulse')}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/10">
                                                {prod.cat}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl md:text-2xl font-bold font-serif line-clamp-1">{prod.name}</h3>
                                            <span className="text-lg md:text-xl font-bold text-primary">₹ {prod.price}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-2 line-clamp-2 min-h-[40px] leading-relaxed">{prod.description}</p>
                                        {(prod.length || prod.width) && (
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                                <span className="material-symbols-outlined text-sm">straighten</span>
                                                {prod.length && `${prod.length}`}
                                                {prod.length && prod.width && ' x '}
                                                {prod.width && `${prod.width}`}
                                            </div>
                                        )}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => addToCart(prod)}
                                                className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
                                            >
                                                <ShoppingBag size={18} className="transition-transform group-hover/btn:-rotate-12" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-slate-500">New arrivals coming soon to our signature gallery.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase italic">Milestones & Moments</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Our Achievements</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Celebrating the recognition of our craft, community impact, and the journey of Killimangalam മുത്തങ്ങ പുല്ല് Mats.</p>
                    </div>

                    {loadingAchievements ? (
                        <div className="flex justify-center py-12">
                            <Loader2 size={32} className="animate-spin text-primary" />
                        </div>
                    ) : achievements.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {achievements.map((achievement, idx) => (
                                <motion.div
                                    key={achievement.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-[#FAF9F6] rounded-3xl overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer flex flex-col"
                                    onClick={() => setSelectedAchievement(achievement)}
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-200">
                                        <img
                                            src={achievement.image_url}
                                            alt={achievement.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                            <span className="text-white text-xs font-bold uppercase tracking-widest">
                                                {new Date(achievement.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                                            {achievement.description}
                                        </p>
                                        <div className="mt-6 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-sm">stars</span>
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Official Recognition</span>
                                            </div>
                                            <button className="text-primary hover:text-primary/80 transition-colors">
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#FAF9F6] rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-400 font-serif italic text-lg">Our legacy is being written. New milestones to be shared soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Achievement Modal */}
            <AnimatePresence>
                {selectedAchievement && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative max-h-[90vh] md:max-h-[85vh] border border-slate-100 flex flex-col"
                        >
                            <button 
                                onClick={() => setSelectedAchievement(null)}
                                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px] md:text-[24px]">close</span>
                            </button>

                            <div className="p-6 md:p-12 w-full flex flex-col overflow-y-auto">
                                <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6 mt-6 md:mt-0">
                                    <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary w-fit">
                                        <span className="material-symbols-outlined text-sm">stars</span>
                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Official Recognition</span>
                                    </div>
                                    <span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full w-fit">
                                        {new Date(selectedAchievement.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 md:mb-8 leading-tight">
                                    {selectedAchievement.title}
                                </h2>
                                
                                <div className="prose prose-slate prose-base md:prose-lg max-w-none">
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap font-light">
                                        {selectedAchievement.description}
                                    </p>
                                </div>
                                
                                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-100 text-center">
                                    <p className="text-xs sm:text-sm font-serif italic text-slate-400">
                                        Killimangalam പുൽപായ Mat Weaving Industrial Co-operative Society
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <section className="py-24 bg-[#f8f6f6]">
                <div className="container">
                    <div className="bg-olive/10 rounded-3xl overflow-hidden grid lg:grid-cols-2">
                        <div className="p-12 md:p-16 flex flex-col justify-center">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Experience the Tradition</h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Visit our heritage center in Killimangalam to witness the looms in action and learn the history of our craft from the masters themselves.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    <span>Killimangalam, Thrissur, Kerala, India</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                                    <span>Mon - Sat: 09:00 AM - 05:00 PM</span>
                                </div>
                            </div>
                            <Link to="/visit" className="w-fit bg-olive text-white px-8 py-3 rounded-lg font-bold hover:bg-olive/90 transition-all">
                                Schedule a Visit
                            </Link>
                        </div>
                        <div className="relative min-h-[400px]">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_tfe_tC5KdkY8jPlPByDQ1q_jrWZeUzwumbAhFdnBlIdIHZDzgYyVr0V0229TkEz1F2rk_0Qx4xGRhj4KcyuKEfOBvUTgnLl5cpjVYIAiXw2736UXWXeyaoM_2U481NLCwhw_kQa8_2AR59DGnB7M17Q5G7rs3OxIESrZx28ARxigGt5P_WG_n5wRARoK-3IcExzNHyXHKvaJ7ZkZQixhO4BR0HIo0jGHdKGtrGVoDjuAa_Fq3w1JHdP3POVph5ynUCVlRbvXW1g"
                                alt="Killimangalam Landscape"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-olive/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
