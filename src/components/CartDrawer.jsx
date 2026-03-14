import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        // checkoutViaWhatsApp - moved to checkout page
    } = useCart();

    const navigate = useNavigate();
    const total = getCartTotal();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary" size={24} />
                                <h2 className="text-xl font-serif font-bold text-slate-900">Your Basket</h2>
                                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                                    {cartItems.length} items
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Your basket is empty</h3>
                                    <p className="text-slate-500 text-sm max-w-[200px]">
                                        Explore our collection and add some heritage to your basket.
                                    </p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-primary font-bold text-sm hover:underline"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-slate-900 truncate pr-2">{item.name}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-slate-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">{item.cat}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:bg-slate-50 text-slate-600"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="px-2 text-sm font-bold text-slate-900 min-w-[24px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:bg-slate-50 text-slate-600"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <p className="font-bold text-primary">₹ {item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-medium">Subtotal</span>
                                    <span className="text-2xl font-serif font-bold text-slate-900">
                                        ₹{total.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400">
                                    Shipping and taxes calculated at checkout. Orders are finalized via WhatsApp.
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-primary/90 transition-all group"
                                >
                                    Review & Checkout
                                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                                </button>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full text-slate-500 text-sm font-bold hover:text-slate-700 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
