import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Craft = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="craft-page"
        >
            {/* Intro Section */}
            <section className="pt-32 pb-20 bg-[#FDFBF7]">
                <div className="container text-center max-w-4xl">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">Heritage Excellence</span>
                    <h1 className="text-5xl md:text-7xl mt-4 mb-8 text-[#4A0404] leading-tight font-serif">
                        The Art of the Kora
                    </h1>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                        A 300-year-old tradition of artisanal weaving from the heart of Kerala. Each mat is a testament to the harmony between nature and human skill, passed down through generations of master weavers.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <span className="material-symbols-outlined text-primary text-4xl animate-bounce">expand_more</span>
                    </div>
                </div>
            </section>

            {/* Section 1: The Harvest */}
            <section className="py-20 bg-white">
                <div className="container grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="inline-block p-3 bg-primary/5 rounded-full mb-4">
                            <span className="material-symbols-outlined text-primary">potted_plant</span>
                        </div>
                        <h2 className="text-4xl text-primary mb-6 font-serif">1. The Harvest</h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            The journey begins at the lush riverside, where the wild Kora grass grows tall and resilient. Our artisans carefully select only the finest strands, ensuring the raw material possesses the strength and flexibility required for fine weaving.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 italic">
                            <span className="material-symbols-outlined text-terracotta">eco</span>
                            Sustainably harvested during the monsoon peak.
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative group">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
                            <img
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd-gF9L4xUvfsMpyXLrMBujni1V7hZzxceucfimmRLwih-P6CPF04MPLc5xu1b_Z-axZnxl07lEHA-jCdU7h5mAE36MYmR01kcN3pTLqX9DAWXZTDyD6-206x25250RCw8rgmQ3E7pWyqIgJBXil3Yis9ASM6j-s8pO23zfJp-UQpNNQ8f1Q3MWC_xpLeap8-PXmqeGUc46SF7q9OF1zbBrvMqmn4Ggb9WYNxI3oBAKNdSKbZfRjpRLnCLWrtxnHR0ERNUXcyX5V0"
                                alt="The Harvest"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Splitting & Seasoning */}
            <section className="py-20 bg-[#FAF9F6] border-y border-terracotta/20">
                <div className="container">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-4xl text-[#4A0404] mb-4 font-serif">2. Sun-Kissed Seasoning</h2>
                        <p className="text-slate-700">Transformation from raw fiber to refined strand through the power of the tropical sun.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Manual Splitting",
                                desc: "Strands are split into hair-thin fibers by hand.",
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcminnzPcpZbwNfxgl2V-e_jhfxblOMDDX5B20E9OGKVsud2tGHEQCtDWWWhofusy6EAkCRE7yHP5VluVLR44VA1AHwspiWdJmPePM1aaCJTBMs84bPBSoxC_Cba2EHHFBYWV3UGsJW-X7wQ3zIU0T2jKCAXvqtbU5XgFNmVzoY6EccdhxYgfMZ_JZsWrMewXhWCxDh06nOVNtuP3vlC8u2I5WrG3kAcP0WB719e2VmpUOW-nPj5FoQ1gvDMYeHMFHBhLhB1Ff47g"
                            },
                            {
                                title: "Solar Seasoning",
                                desc: "Drying in open courtyards to lock in durability.",
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOrStNS-0QrIqg-y1gAk40nGGlDlIOYr4DzC03vPokhveAYQaw10oqPy5shBXBcsIyB2o_RlmecxqnP2_qYQ5F4Zf2Ez6gqtcE4quBsKlqc2IURvBJYXrgy-tnKcninFMOEyiM-3f5Jiyy4Bn5KQsUTS46nPIu9Qs6seOjY4n9zGeTJK7FPlbxGmHj5vvfRM-JuHUoSB9Fy8WJZTgThYkezo0wbneJGqcjOzfO0F8uIs1V3MjcWG7mpOZMROw4oWB-L31RbVK2DuQ"
                            },
                            {
                                title: "Fiber Grading",
                                desc: "Selecting the perfect hue for the dyeing process.",
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKuEXp_iNmZ9SO_mZIHVIMLNC50MKedz_VM03qbaEb8NHM_iaMjFRd8tyaCkw1vPkIZzWMch9SN9kXmZGDyrTgqr5mH70FWg0WHE7d_IgfFSxBbZK8qZ7TRmWhesu3gvmHFmn6chou7dkt-E-UFz4iWrm4_G3qPGhTXdKwye4-y9VmBKPPVv6VWhXMYNLsMh9e3rqBt8o1rpMJRsLezsNp9s-CMCrKhegZNdXfYbkA7dDEfgS_fWWcn5Oz1ZRa9LIxgOkACNECVPU"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-2 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform">
                                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                                    <img className="w-full h-full object-cover" src={item.img} alt={item.title} />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-bold text-[#4A0404]">{item.title}</h3>
                                    <p className="text-sm text-slate-600 mt-2">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Infusing Color */}
            <section className="py-24 bg-[#4A0404] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                <div className="container relative z-10 grid md:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="rounded-lg overflow-hidden h-64 shadow-2xl">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg2OCbrn1se9Yr024HFGkdIL2qk6P097vYfclL7maoAEUZFTWqupAqwXjFWAAaIV-Yq2aPhnDlY7wDI_lT-OGbHh58Kk8HsKWrZ2Ewikhprf-hDRyvDGbAgWOtv5rGo9hWJlTg_r2r_26j1fh6K2v-ewWH-W4fN2aitn6qgbl_SD2ZPGio9nu3HgVj9obRIy635iVlhoQJZnvSGGo5v2sB99ULudDfjkSPgl-J6McJ3mshPbr8_jt7Otx3Q9ywSAsR_HbLyzJ5g9g" alt="Dyeing 1" />
                            </div>
                            <div className="rounded-lg overflow-hidden h-40 shadow-2xl">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Qf6izG8E5yPhzJ0U_q7oIGcIqMt3EbphAHHigC8XqoundF-iJRsM-5lbVN8uXWBCq7FlOaB7VMPxdkC4u0AEEaq-untCgyFVnQ2g6mkSLTG94UMUutg-dPNS5BLvhhLCw-lNtMjQQJ3rLGZnPPQaIia95JMlQAzmcNYNq8ZBGpdix1_ifdeIlSjGNfwnkhlOVpSG-ae3h7wTXGhcS0l8VyZ8FBnUQtrV89T0AJOQ-gEmAyAGlXtc0HhEuogorcK5Up7E37ZHGpw" alt="Dyeing 2" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="rounded-lg overflow-hidden h-40 shadow-2xl">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4SAb9Pn2Y0RNOhOH_pi9CcoPlrJcDQuLAKgwT1JCdwCfw-kfYG7ZcvWjCBRLFWXYVauAn4xMUuAIeXgZ2_VvEphGaUGBkK-OcJMlgMgJ5Zclhqb8ymaQdIOCHyqtDeaE2i6Uuf2uMx0gkDXVtbp5M3uVWBWAMrOoI6WPAhARIVzpzah9UyQ7kT3gN1V6t7WkSHy9EbeTeNeeiwsteLwojRAi0jv11V0Xc1kwpwfedPneUwSryMhPX0IY_JyZdIE1tohumpkWnlSs" alt="Dyeing 3" />
                            </div>
                            <div className="rounded-lg overflow-hidden h-64 shadow-2xl">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGnrro8lm7h7AubCye6urmMLZE2U8XPvYaDUH0j4L8W_eQPQOmPsXXuYEcBGpt_Cd9r7ACrLqdPS-69ioV31l96HGZ-9iwRaGrbYxVw5guHftLnRteIxw-RkhFOOBB45nqIkbFD99LuB3tIRh7UFnw6maeD4TpPbCT_twpeYw49xitcvKNr40NrJcDJ0mRM_I8t2c2QjgDam_SICPSAEtEk6h-yYSDV0NQlD0RUZOUCTsOKh-2BE7F5g4HHRFxQmeeTuF6DrXPm04" alt="Dyeing 4" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl mb-8 border-l-4 border-primary pl-6 font-serif">3. Infusing Color</h2>
                        <p className="text-lg text-slate-200 leading-relaxed mb-6 font-light">
                            Our mats are defined by their deep, earthy tones. We use organic dyes derived from local seeds, bark, and minerals. Bundles of fiber are boiled in these natural pigments to achieve rich, lasting maroon and jet-black hues that never fade.
                        </p>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                                100% Non-toxic, eco-friendly pigments
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                                Traditional slow-boil infusion technique
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                                Unique color depth unmatched by synthetics
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 4: The Weaving Section */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container flex flex-col items-center">
                    <div className="text-center mb-16 max-w-3xl">
                        <h2 className="text-4xl md:text-5xl text-[#4A0404] mb-6 font-serif">4. The Master's Loom</h2>
                        <p className="text-slate-700 text-lg">
                            The final stage is where the magic happens. Using a traditional floor loom, our master weavers sit in quiet focus, rhythmically interlacing the colored strands into intricate geometric patterns.
                        </p>
                    </div>
                    <div className="w-full relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
                        <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvB-eUTyZsMJLJtj5qad3V7Q2eShIDnAv62vs7W3Halwdhger1RtH_fXUPWcR2WA562TvT7VbUCHDG9f5_9c0xuTWvnDrYkGexCStAckJMjzl_vOt1fIgpVSFXVRCYYb89rd4Sffs_1N8jRbWE1yTelTSDxkT0TLxqT1cP4f7DT22Oqbc7s5vfthqFqXkDJVmWPt6GgsfxWofD93i_r_jQwB9g3tfwSgVa1qbUnYmvKJ9u5yrDepoPcAvT5R8l8EoRLsmDAODZP2I"
                            alt="The Loom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
                            <div className="text-white">
                                <p className="text-sm uppercase tracking-widest font-bold text-primary mb-2">The Rhythm of Heritage</p>
                                <h3 className="text-2xl md:text-3xl font-bold max-w-lg leading-tight">Every mat takes 15 to 20 days of focused precision to complete.</h3>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12 mt-16 w-full">
                        <div className="flex flex-col items-center text-center">
                            <div className="text-primary mb-4">
                                <span className="material-symbols-outlined text-5xl">grid_view</span>
                            </div>
                            <h4 className="font-bold mb-2">Intricate Patterns</h4>
                            <p className="text-sm text-slate-600">Geometry inspired by ancient temple architecture.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-primary mb-4">
                                <span className="material-symbols-outlined text-5xl">precision_manufacturing</span>
                            </div>
                            <h4 className="font-bold mb-2">Handmade Precision</h4>
                            <p className="text-sm text-slate-600">Zero machinery used, only the skilled touch of an artisan.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-primary mb-4">
                                <span className="material-symbols-outlined text-5xl">verified</span>
                            </div>
                            <h4 className="font-bold mb-2">Legacy Guaranteed</h4>
                            <p className="text-sm text-slate-600">Each piece is signed by the weaver who crafted it.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA Section */}
            <section className="py-24 border-t border-primary/10 text-center">
                <div className="container max-w-5xl">
                    <h2 className="text-4xl text-[#4A0404] mb-6 font-serif">Experience the Heritage</h2>
                    <p className="text-slate-600 mb-10 text-lg max-w-2xl mx-auto">
                        Bring a piece of Killimangalam’s 300-year history into your home. Each purchase directly supports our community of master artisans.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/products" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
                            Shop the Collection
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <Link to="/visit" className="border border-primary text-primary hover:bg-primary/5 px-10 py-4 rounded-lg font-bold text-lg transition-all">
                            Visit Our Workshop
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Craft;
