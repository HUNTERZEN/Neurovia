import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Founders } from './components/Founders';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { RepairShops } from './pages/RepairShops';
import { GetRemoteHelp } from './pages/GetRemoteHelp';
import { PrivacyPolicy } from './pages/policies/PrivacyPolicy';
import { CookiePolicy } from './pages/policies/CookiePolicy';
import { TermsOfService } from './pages/policies/TermsOfService';
import { RefundPolicy } from './pages/policies/RefundPolicy';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/repair-shops" element={<RepairShops />} />
          <Route path="/remote-help" element={<GetRemoteHelp />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Founders />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}