import React from 'react';
import { motion } from 'framer-motion';

const Visit = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="visit-page"
        >
            <section className="pt-32 pb-20 bg-bg-light">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Craft Tourism</span>
                        <h1 className="text-5xl md:text-7xl mt-4 mb-8 text-primary font-serif">Visit Killimangalam</h1>
                        <p className="text-lg text-slate-600 font-light leading-relaxed">
                            Experience the rhythm of the looms and the warmth of our community. We welcome visitors to witness the creation of authentic മുത്തങ്ങ പുല്ല് heritage.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-stretch">
                        <div className="bg-white p-12 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 flex flex-col justify-between">
                            <div>
                                <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Guided Craft Tours</h2>
                                <p className="text-slate-600 mb-10 leading-relaxed text-lg font-light">
                                    Walk through the drying yards, watch master weavers at work, and learn about our natural dyeing processes. Our tours are curated to provide a deep connection with the craft.
                                </p>
                                <div className="space-y-8 mb-12">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <span className="material-symbols-outlined">schedule</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Operating Hours</p>
                                            <p className="text-slate-500">Mon - Sat: 09:00 AM - 05:00 PM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <span className="material-symbols-outlined">location_on</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Location</p>
                                            <p className="text-slate-500">Killimangalam, Thrissur, Kerala, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Request a Booking
                                <span className="material-symbols-outlined">event_available</span>
                            </button>
                        </div>

                        <div className="rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px]">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_tfe_tC5KdkY8jPlPByDQ1q_jrWZeUzwumbAhFdnBlIdIHZDzgYyVr0V0229TkEz1F2rk_0Qx4xGRhj4KcyuKEfOBvUTgnLl5cpjVYIAiXw2736UXWXeyaoM_2U481NLCwhw_kQa8_2AR59DGnB7M17Q5G7rs3OxIESrZx28ARxigGt5P_WG_n5wRARoK-3IcExzNHyXHKvaJ7ZkZQixhO4BR0HIo0jGHdKGtrGVoDjuAa_Fq3w1JHdP3POVph5ynUCVlRbvXW1g"
                                alt="Killimangalam Landscape"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h3 className="text-2xl font-serif font-bold mb-2">How to Reach Us</h3>
                                <p className="text-sm opacity-90 leading-relaxed font-light">
                                    Easily accessible via Thrissur-Chelakkara route. Shoranur Junction is the nearest major railhead (15km).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-10 rounded-2xl bg-bg-light text-center border border-primary/5 hover:border-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">call</span>
                            <h4 className="font-bold mb-2">Call Us</h4>
                            <p className="text-slate-600">+91 944 761 4060</p>
                            <p className="text-xs text-slate-400 mt-2">Enquiries & Bulk Orders</p>
                        </div>
                        <div className="p-10 rounded-2xl bg-bg-light text-center border border-primary/5 hover:border-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">mail</span>
                            <h4 className="font-bold mb-2">Email</h4>
                            <p className="text-slate-600">killimangalamsociety@gmail.com</p>
                            <p className="text-xs text-slate-400 mt-2">Collaborations</p>
                        </div>
                        <div className="p-10 rounded-2xl bg-bg-light text-center border border-primary/5 hover:border-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">share</span>
                            <h4 className="font-bold mb-2">Social</h4>
                            <div className="flex justify-center gap-4 mt-2">
                                <a href="#" className="text-slate-600 hover:text-primary transition-colors">Instagram</a>
                                <a href="#" className="text-slate-600 hover:text-primary transition-colors">Facebook</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Visit;
