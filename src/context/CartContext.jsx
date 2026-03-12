import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('kili-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('kili-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            // Remove ₹ and commas from price string for calculation
            const price = parseFloat(item.price.replace(/[₹,]/g, ''));
            return total + (isNaN(price) ? 0 : price * item.quantity);
        }, 0);
    };

    const checkoutViaWhatsApp = (adminNumber = '919048911000') => { // Replace with actual admin number
        const total = getCartTotal();
        let message = `*Order Inquiry from Killimangalam Website*\n\n`;
        message += `Hello, I'm interested in purchasing the following items:\n\n`;

        cartItems.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`;
            message += `   - ID: ${item.id}\n`;
            message += `   - Quantity: ${item.quantity}\n`;
            message += `   - Price: ${item.price}\n\n`;
        });

        message += `*Total Order Amount: ₹${total.toLocaleString('en-IN')}*\n\n`;
        message += `Please let me know the next steps for payment and shipping.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${adminNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            checkoutViaWhatsApp
        }}>
            {children}
        </CartContext.Provider>
    );
};
