import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import ShowroomBookingModal from './components/ShowroomBookingModal';
import QuickViewModal from './components/QuickViewModal';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleOpenBooking = () => setBookingModalOpen(true);
  const handleCloseBooking = () => setBookingModalOpen(false);

  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar onOpenBookingModal={handleOpenBooking} />

              <main style={{ flex: 1 }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomePage
                        onOpenBookingModal={handleOpenBooking}
                        onQuickView={handleQuickView}
                      />
                    }
                  />
                  <Route
                    path="/shop"
                    element={<ShopPage onQuickView={handleQuickView} />}
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProductDetailPage
                        onOpenBookingModal={handleOpenBooking}
                        onQuickView={handleQuickView}
                      />
                    }
                  />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                  <Route
                    path="/wishlist"
                    element={<WishlistPage onQuickView={handleQuickView} />}
                  />
                  <Route
                    path="/about"
                    element={<AboutPage onOpenBookingModal={handleOpenBooking} />}
                  />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  {/* Catch-all route */}
                  <Route
                    path="*"
                    element={
                      <HomePage
                        onOpenBookingModal={handleOpenBooking}
                        onQuickView={handleQuickView}
                      />
                    }
                  />
                </Routes>
              </main>

              <Footer />

              {/* Global Modals & Slide-overs */}
              <CartDrawer />
              <AuthModal />
              <ShowroomBookingModal
                isOpen={bookingModalOpen}
                onClose={handleCloseBooking}
              />
              <QuickViewModal
                product={quickViewProduct}
                onClose={handleCloseQuickView}
              />
              <WhatsAppFloatingButton />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
