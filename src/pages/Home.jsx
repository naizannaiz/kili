import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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
        fetchFeatured();
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
                <div className="container relative z-10 w-full mt-12">
                    <div className="max-w-2xl space-y-8">
                        <span className="inline-block py-1 px-3 rounded bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-[0.2em]">100-Year Heritage</span>
                        <h1 className="text-white text-6xl md:text-8xl font-serif font-black leading-[1.1] tracking-tight">
                            Weaving Heritage into <span className="text-primary italic">Luxury</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                            A century of traditional craftsmanship and eco-friendly elegance woven into every strand of Killimangalam Kora grass.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/products" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-base font-bold transition-all flex items-center gap-2">
                                Explore the Collection <ChevronRight size={20} />
                            </Link>
                            <button className="border border-white/20 hover:border-secondary/50 text-white px-8 py-4 rounded-lg text-base font-bold transition-all bg-white/5 backdrop-blur-sm">
                                Watch The Film
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 right-12 hidden lg:flex items-center gap-4 text-white/40">
                    <div className="h-px w-20 bg-white/20"></div>
                    <span className="text-xs uppercase tracking-widest font-bold">Scroll to discover</span>
                </div>
            </section>

            {/* Quick Access Heritage Bar */}
            <section className="relative z-20 -mt-12 container">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        { title: 'Our Heritage', path: '/about', icon: 'history_edu' },
                        { title: 'The Craft', path: '/craft', icon: 'precision_manufacturing' },
                        { title: 'Signature Shop', path: '/products', icon: 'shopping_bag' },
                        { title: 'Impact', path: '/impact', icon: 'diversity_3' },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className="group flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-4 rounded-2xl hover:bg-primary/5 transition-all duration-500"
                        >
                            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</div>
                                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold group-hover:text-slate-600">Explore</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Heritage & Recognition Section */}
            <section className="py-24 bg-[#FAF9F6] transition-colors">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                                A Legacy of <br /><span className="text-secondary underline decoration-primary underline-offset-8">Global Excellence</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Our mats are not just flooring; they are recognized globally for their cultural significance and superior quality. Each piece is a testament to the intangible cultural heritage of the artisan communities in India.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* GI Tag */}
                            <div className="p-8 rounded-xl border border-secondary/20 bg-white shadow-xl shadow-primary/5 transition-transform hover:-translate-y-2">
                                <div className="text-primary mb-4">
                                    <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">GI Tagged</h3>
                                <p className="text-slate-500 text-sm">Authentic Geographical Indication certifying the unique origin and traditional methods of Killimangalam.</p>
                            </div>
                            {/* UNESCO */}
                            <div className="p-8 rounded-xl border border-secondary/20 bg-white shadow-xl shadow-primary/5 transition-transform hover:-translate-y-2">
                                <div className="text-primary mb-4">
                                    <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>award_star</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">UNESCO Honored</h3>
                                <p className="text-slate-500 text-sm">Recognized for preserving intangible cultural heritage through exceptional artisanry and sustainability.</p>
                            </div>
                        </div>
                    </div>
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
                                desc: 'Sustainably gathering fine kora grass from the lush riverbanks, selected only during peak maturity.',
                                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOZyal-re8e58YmQtAKnN6mqgoImcuvdVtUNYFFpXCY8HwhinjiImQcf4LUmnyz1kslWyTgyVrO3srbvp9EPkIvyq1kITfpS8XMV63G7qaw8Var1qjenE3WnO_uadOEModPuhcpq_6WcqInq072ZXoGd3i69EO6PBIYpA2OjUP0IF4ymml9cK2sE9MbLeA8B6cTiXfAtXuUXDS533TGOPcJDLYZVOvSjSBXTcxt7Mj6AHv-SgwMUbFccIFru0qcd-iua0y4-jb5GI'
                            },
                            {
                                id: '02',
                                title: 'Natural Dyeing',
                                desc: 'Using vibrant, eco-friendly pigments derived from tree bark and medicinal plants to color each strand.',
                                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ1IBQ1UlBlTvITda-kg__ua91JAeICp8A3rZAB4tofr3IzBERFXw6dH_sd_zy1XLDwcnqAM8BLis5MdCw2K_nnypXgIgURhc6aSYtO106f-8jBeSUtVeh6tS6gf1ujg6TyDjubzGQ12kyNGlRJ3Ee491JoOh02TaL1AhjuDmhBPEEnj_9ABUWlS1wiY3-J4IcHyPaQM32L-WjQ2gJgkN63ovWesv1w2299CJvoFoH_DalxFiTRnXybqHJAtWBVGwvmFYZDOfs9Gs'
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProducts.map((prod, i) => (
                                <div key={prod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg shadow-black/5 group">
                                    <div className="aspect-square relative overflow-hidden">
                                        <img src={prod.img} alt={prod.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        {i === 0 && <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-primary">Latest Arrival</div>}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold font-serif">{prod.name}</h3>
                                            <span className="text-primary font-bold">{prod.price}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{prod.description}</p>
                                        <div className="flex gap-3">
                                            <Link to="/products" className="flex-1 text-center py-3 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-colors">
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => addToCart(prod)}
                                                className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all shadow-md active:scale-95"
                                            >
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

            {/* Experience Section */}
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
