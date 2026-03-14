import React from 'react';
import { motion } from 'framer-motion';

const Impact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="impact-page"
        >
            <section className="pt-32 pb-20 bg-white">
                <div className="container text-center max-w-3xl">
                    <span className="text-secondary font-bold tracking-widest uppercase text-[10px] md:text-xs">A Greater Purpose</span>
                    <h1 className="text-4xl md:text-7xl mt-4 mb-8 text-primary font-serif">Weaving Change</h1>
                    <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                        Our work extends beyond the loom; it is about creating a sustainable future for our community and restoring the dignity of local artisanal labor.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-bg-light">
                <div className="container grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-12 rounded-3xl shadow-sm border border-primary/10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                            <span className="material-symbols-outlined text-4xl">groups</span>
                        </div>
                        <h3 className="text-3xl font-serif font-bold mb-6">Women Empowerment</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            Today, the co-operative is largely powered by women from diverse backgrounds. By providing dignified rural employment, we allow our artisans to support their families while preserving their heritage.
                        </p>
                        <p className="border-l-4 border-secondary pl-6 text-primary italic font-serif">
                            "This craft has given us a voice and a sense of pride in our identity."
                        </p>
                    </div>

                    <div className="bg-white p-12 rounded-3xl shadow-sm border border-primary/10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                            <span className="material-symbols-outlined text-4xl">eco</span>
                        </div>
                        <h3 className="text-3xl font-serif font-bold mb-6">Sustainability</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            മുത്തങ്ങ പുല്ല് is a renewable material that grows abundantly along riverbanks. The entire weaving process generates almost no waste or polluting by-products, making these mats a perfect alternative to plastic.
                        </p>
                        <p className="border-l-4 border-secondary pl-6 text-primary italic font-serif">
                            "Biodegradable, durable, and naturally cool."
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-bg-dark text-white overflow-hidden">
                <div className="container flex flex-col md:flex-row gap-20 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Global Footprint</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed text-lg font-light">
                            From our small village in Kerala, our mats have travelled to homes in over 20 countries. Each mat carries with it a piece of our culture and a commitment to sustainable living.
                        </p>
                        <div className="flex items-center gap-4 text-secondary font-bold text-xl">
                            <span className="material-symbols-outlined text-3xl">public</span>
                            <span>Shipped to 20+ Countries</span>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA-fZorfr7c4acT_C5K6ZUavrX4PPkrXxYFCymzckjfdw7Tgrmovm31hBB_qba8WH16EMwJ9ktS0SZtS-bh68nRcDWmsf_0NiIAaGa6oBVKPfzXY65QAdrGv6nM-flaHUTzeP_dF5SEOzzwqYuu23Kb71kpWXe7yASpca_OFBFBrlW8L1027K8Mz1d6vMSCpb_21BlA3K3vfsJ4BX-6Aa01fjRl5inI_Lx8kp5yEMPuMEWE-gJpRZJrPTLR6Aa3pO9qox-Ded3hS0"
                                alt="Global Reach"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <div className="inline-block p-4 bg-primary text-white rounded-full mb-4 shadow-xl">
                                        <span className="material-symbols-outlined text-4xl">reward_star</span>
                                    </div>
                                    <h4 className="font-serif font-bold text-2xl">UNESCO Recognized</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Impact;
