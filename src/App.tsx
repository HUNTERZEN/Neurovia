import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Founders } from './components/Founders';
import { Members } from './components/Members';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { RepairShops } from './pages/RepairShops';
import { GetRemoteHelp } from './pages/GetRemoteHelp';
import { FAQ } from './pages/FAQ';
import { VideoSolutions } from './pages/VideoSolutions';
import Contact from './pages/Contact';
import { PrivacyPolicy } from './pages/policies/PrivacyPolicy';
import { CookiePolicy } from './pages/policies/CookiePolicy';
import { TermsOfService } from './pages/policies/TermsOfService';
import { RefundPolicy } from './pages/policies/RefundPolicy';
import { useScrollToTop } from './hooks/useScrollToTop';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ProtectedRoute as AdminProtectedRoute } from './components/admin/ProtectedRoute';
import { ChatProvider } from './context/ChatContext';
import { IntegratedChat } from './components/chat/IntegratedChat';

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<div className="text-white">Users Page</div>} />
              <Route path="shops" element={<div className="text-white">Repair Shops Page</div>} />
              <Route path="tickets" element={<div className="text-white">Support Tickets Page</div>} />
              <Route path="analytics" element={<div className="text-white">Analytics Page</div>} />
              <Route path="settings" element={<div className="text-white">Settings Page</div>} />
            </Route>

            {/* Auth Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <div>
                  <Hero />
                  <Features />
                  <Founders />
                  <Members />
                </div>
                <Footer />
              </>
            } />
            <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
            <Route path="/repair-shops" element={<><Navbar /><RepairShops /><Footer /></>} />
            <Route path="/remote-help" element={<><Navbar /><GetRemoteHelp /><Footer /></>} />
            <Route path="/video-solutions" element={<><Navbar /><VideoSolutions /><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
            <Route path="/faq" element={<><Navbar /><FAQ /><Footer /></>} />
            <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
            <Route path="/cookies" element={<><Navbar /><CookiePolicy /><Footer /></>} />
            <Route path="/terms" element={<><Navbar /><TermsOfService /><Footer /></>} />
            <Route path="/refund" element={<><Navbar /><RefundPolicy /><Footer /></>} />
          </Routes>
          <IntegratedChat />
        </div>
      </Router>
    </ChatProvider>
  );
}