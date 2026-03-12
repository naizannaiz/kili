import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Craft from './pages/Craft';
import Products from './pages/Products';
import Visit from './pages/Visit';
import Impact from './pages/Impact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/admin/login" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/craft" element={<Craft />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/visit" element={<Visit />} />
                            <Route path="/impact" element={<Impact />} />

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
        </AuthProvider>
    );
}

export default App;
