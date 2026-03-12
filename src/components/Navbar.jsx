import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { setIsCartOpen, cartItems } = useCart();

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Craft', path: '/craft' },
        { name: 'Products', path: '/products' },
        { name: 'Visit', path: '/visit' },
        { name: 'Impact', path: '/impact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                    <div className="text-primary">
                        <span className="material-symbols-outlined text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>grid_guides</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold font-serif tracking-tight text-text-dark">Killimangalam</h2>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-bold tracking-wide transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-slate-600 hover:text-primary'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3 md:gap-6">
                    {/* Cart Icon */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-slate-600 hover:text-primary transition-colors"
                    >
                        <ShoppingBag size={22} className="md:w-6 md:h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] md:text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <Link to="/products" className="hidden sm:block bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95">
                        Shop Collection
                    </Link>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-primary p-1" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-bold ${location.pathname === link.path ? 'text-primary' : 'text-slate-600'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/products" className="bg-primary text-white py-3 rounded-lg text-center font-bold" onClick={() => setIsOpen(false)}>Shop Collection</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

// Helper for AnimatePresence in Navbar
import { AnimatePresence } from 'framer-motion';

export default Navbar;
