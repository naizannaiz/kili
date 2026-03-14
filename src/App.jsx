import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import About from './pages/About';
import Craft from './pages/Craft';
import Products from './pages/Products';
import Visit from './pages/Visit';
import Impact from './pages/Impact';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { CartProvider } from './context/CartContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/admin/login" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div className="app">
                        <Navbar />
                        <CartDrawer />
                        <AnimatePresence mode="wait">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/craft" element={<Craft />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/visit" element={<Visit />} />
                                <Route path="/impact" element={<Impact />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/product/:id" element={<ProductDetails />} />

                                {/* Admin Routes */}
                                <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route path="/admin/dashboard" element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                        </AnimatePresence>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
