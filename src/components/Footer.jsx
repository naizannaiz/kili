import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-bg-dark text-slate-400 py-20 border-t border-white/5">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-3xl">grid_guides</span>
                        <h2 className="text-white text-xl font-bold font-serif">Killimangalam</h2>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Preserving the timeless art of kora grass weaving for generations to come.
                        Sustainable, artisanal, and authentically Indian.
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-white/5 px-4 py-2 rounded text-[10px] font-bold border border-white/10 text-slate-300">UNESCO SEAL 2006</div>
                        <div className="bg-white/5 px-4 py-2 rounded text-[10px] font-bold border border-white/10 text-slate-300">GI TAGGED</div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Legal & Admin</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
                        <li><Link to="/admin" className="hover:text-primary transition-colors italic">Admin Portal</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
                    <p className="text-sm mb-4">Join our inner circle for heritage stories and new collection previews.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-primary text-white"
                        />
                        <button className="bg-primary text-white p-2 rounded hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs">© 2024 Killimangalam Pulpaya Society. All rights reserved.</p>
                <div className="flex gap-8 text-xs">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
