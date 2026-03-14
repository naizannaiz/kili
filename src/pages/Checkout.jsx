import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, getCartTotal, checkoutViaWhatsApp } = useCart();
    const navigate = useNavigate();
    const total = getCartTotal();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center container py-24">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                    <ShoppingBag size={48} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Your basket is empty</h2>
                <p className="text-slate-500 mb-8">Add some heritage products to your basket before checking out.</p>
                <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-lg font-bold">
                    Explore Collection
                </Link>
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
            <div className="container max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 group"
                >
                    <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    Back to shopping
                </button>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Order Summary */}
                    <div className="lg:col-span-3 space-y-8">
                        <div>
                            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Order Summary</h1>
                            <p className="text-slate-500">Review your chosen masterpieces before we finalize your order.</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-black/5 overflow-hidden">
                            <div className="p-6 divide-y divide-slate-100">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="py-6 flex gap-6 first:pt-0 last:pb-0">
                                        <div className="w-24 h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                                                    <p className="font-bold text-primary">₹ {item.price}</p>
                                                </div>
                                                <p className="text-sm text-slate-500 mb-2">{item.cat}</p>
                                                <p className="text-xs text-slate-400">ID: {item.product_number || item.id}</p>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-600 font-medium">Quantity: {item.quantity}</span>
                                                <span className="font-bold">₹{(parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity).toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Finalize Action */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-black/5 p-8 sticky top-32 space-y-6">
                            <h2 className="text-2xl font-serif font-bold text-slate-900">Finalize Order</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Estimated Shipping</span>
                                    <span className="italic">Calculated on chat</span>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                                    <span className="font-bold text-slate-900">Order Total</span>
                                    <div className="text-right">
                                        <div className="text-3xl font-serif font-bold text-primary">₹{total.toLocaleString('en-IN')}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Taxes included</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <p className="text-sm text-secondary leading-relaxed">
                                    <span className="font-bold block mb-1 underline">WhatsApp Checkout</span>
                                    Your order will be sent to our customer care team via WhatsApp. We will confirm availability and share payment details there.
                                </p>
                            </div>

                            <button
                                onClick={() => checkoutViaWhatsApp()}
                                className="w-full bg-primary text-white py-5 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0 group"
                            >
                                <Send size={20} className="group-hover:rotate-12 transition-transform" />
                                Buy Now via WhatsApp
                            </button>

                            <p className="text-[10px] text-center text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
                                Safe & Traditional Hand-to-Hand Service
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Checkout;
