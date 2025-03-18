import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { GetRemoteHelp } from './pages/GetRemoteHelp';
import { RepairShops } from './pages/RepairShops';
import { ExpertChat } from './pages/ExpertChat';
import { SignIn } from './pages/SignIn';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/remote-support" element={<GetRemoteHelp />} />
          <Route path="/repair-shops" element={<RepairShops />} />
          <Route path="/expert-chat" element={<ExpertChat />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;