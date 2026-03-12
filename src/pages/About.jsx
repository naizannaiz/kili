import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="about-page"
        >
            {/* Heritage Header */}
            <section className="pt-32 pb-20 bg-bg-light">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs">Our Heritage</span>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl mt-6 mb-8 text-primary font-serif leading-tight">
                                Established <br /><span className="italic">1953</span>
                            </h1>
                            <p className="text-xl text-slate-700 font-light leading-relaxed mb-10">
                                The Killimangalam Kora Grass Mat Weaving Industrial Co-operative Society (No. 3312) is the heart of our village's heritage, preserving one of the oldest surviving village crafts in Kerala.
                            </p>
                            <div className="flex gap-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-primary">70+</h4>
                                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">Years of Legacy</p>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div>
                                    <h4 className="text-3xl font-bold text-primary">UNESCO</h4>
                                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">Global Honor</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative z-10">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBysBgntm00iSkyCDT3GpJPSt99yQPmadbxiZlX44m33qaa9zXpbM26lFt4f895aVhvuZ3AGri4taSrPql0J5-c1eNw6EQV9Jk2e8cehoE7_fyz2Txi6J-k7F0VM1tGiF6LPsq9JNWOXGS1j-wvIZIflTWFsMnh17PuSb-rUHDWOTtW9mcVI2usLVr-idQTaISxzFHG4xiZvtIp_QQp5AJnBFzlXXIbwwvE2iZYDfbs_Ed-i3nUJgWvu_Wr5ThBosPc40xL9oG0cws"
                                    alt="Killimangalam Heritage"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-0"></div>
                            <div className="absolute -top-6 -left-6 w-48 h-48 border-2 border-secondary/20 rounded-2xl -z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Revival Story */}
            <section className="py-24 bg-bg-dark text-white overflow-hidden">
                <div className="container relative">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The Story of Revival</h2>
                        <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
                        <p className="text-lg text-slate-300 font-light leading-relaxed">
                            By the 2010s, the craft was on the verge of disappearing. Only one elderly weaver, Prabhavathi, was still active when the cultural group Vayali stepped in to support documentation and training.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
                            <h3 className="text-2xl font-serif font-bold mb-4 text-secondary">A Shared Legacy</h3>
                            <p className="text-slate-400 leading-relaxed italic">
                                "Mat weaving here is one of the oldest surviving village crafts in Kerala and is today a major source of livelihood for a group of skilled women weavers who have dedicated their lives to preserving this craft."
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
                            <h3 className="text-2xl font-serif font-bold mb-4 text-secondary">The Future Bound</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Through focused efforts and global recognition, we have since trained over 60 young people—mostly women—ensuring that the rhythmic clatter of our looms continues to echo through the village.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Our Purpose</span>
                        <h2 className="text-4xl font-serif font-bold mt-2">Guiding Principles</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: "eco",
                                title: "Sustainability",
                                desc: "Honoring nature by using only renewable river grass and natural pigments since centuries."
                            },
                            {
                                icon: "groups",
                                title: "Community",
                                desc: "Operating as a non-profit co-operative to ensure every rupee reaches the hands of the weave."
                            },
                            {
                                icon: "verified",
                                title: "Excellence",
                                desc: "Maintaining the rigorous standards that earned us the UNESCO Seal of Excellence."
                            }
                        ].map((val, i) => (
                            <div key={i} className="text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-bg-light flex items-center justify-center text-primary mx-auto">
                                    <span className="material-symbols-outlined text-3xl">{val.icon}</span>
                                </div>
                                <h4 className="text-xl font-bold font-serif">{val.title}</h4>
                                <p className="text-slate-600 leading-relaxed text-sm">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
