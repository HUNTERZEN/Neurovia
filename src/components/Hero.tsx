import React, { useEffect } from 'react';
import { Monitor, Wrench, MessageSquare, ArrowRight, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollIndicator } from './ScrollIndicator';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

export function Hero() {
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

  // Transform values for parallax and fade effects
  const y = useSpring(useTransform(scrollY, [0, 300], [0, -50]), springConfig);
  const opacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollY, [0, 300], [1, 0.95]), springConfig);
  const rightContentY = useSpring(useTransform(scrollY, [0, 300], [0, 50]), springConfig);

  // Orb animations
  const leftOrbX = useSpring(useTransform(scrollY, [0, 300], [0, -50]), springConfig);
  const rightOrbX = useSpring(useTransform(scrollY, [0, 300], [0, 50]), springConfig);
  const orbOpacity = useSpring(useTransform(scrollY, [0, 300], [0.3, 0]), springConfig);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"
        style={{ opacity }}
      />
      
      {/* Glowing Orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"
        style={{ 
          x: leftOrbX,
          opacity: orbOpacity,
        }}
      />
      <motion.div 
        className="absolute top-40 right-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
        style={{ 
          x: rightOrbX,
          opacity: orbOpacity,
        }}
      />
      
      {/* Main Content Container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Content */}
        <div className="flex-1 pt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 pt-12">
              {/* Left Content */}
              <motion.div 
                className="flex-1 text-center lg:text-left"
                style={{ y, opacity }}
              >
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Expert Tech Support
                  <motion.span 
                    className="block mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    At Your Fingertips
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Connect with verified tech experts for remote assistance or find trusted repair shops near you. Get your devices fixed quickly and reliably.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link to="/remote-help" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                    <button className="relative px-6 py-3 bg-black rounded-lg text-white font-semibold">
                      Get Remote Help
                      <ArrowRight className="inline-block ml-2 w-5 h-5" />
                    </button>
                  </Link>
                  <Link to="/repair-shops" className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-300 hover:text-white font-semibold transition-colors">
                    Find Repair Shops
                  </Link>
                </motion.div>
                
                {/* Stats */}
                <motion.div 
                  className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div>
                    <h3 className="text-3xl font-bold text-white">500+</h3>
                    <p className="text-gray-400">verified experts</p>
                  </div>
                  <div className="w-px h-12 bg-gray-800" />
                  <div>
                    <h3 className="text-3xl font-bold text-white">24/7</h3>
                    <p className="text-gray-400">support</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Service Card */}
              <motion.div 
                className="flex-1 w-full max-w-xl"
                style={{ y: rightContentY }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  {/* Card Glow */}
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-50"
                    animate={{ 
                      opacity: [0.5, 0.7, 0.5],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Main Card */}
                  <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-white">Available Services</h2>
                      <motion.span 
                        className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-green-400"
                        animate={{ 
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Online
                      </motion.span>
                    </div>

                    {/* Services List */}
                    <div className="space-y-4 mb-6">
                      <motion.div 
                        className="relative group p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <MessageSquare className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">Remote Diagnosis</h3>
                            <p className="text-gray-400 text-sm">Get instant help from experts online</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="relative group p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <Wrench className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">Local Repair Shops</h3>
                            <p className="text-gray-400 text-sm">Find trusted repair services nearby</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        className="flex items-center gap-2 p-4 bg-gray-800 rounded-xl text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Shield className="w-5 h-5 text-purple-400" />
                        <span>Verified Experts</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 p-4 bg-gray-800 rounded-xl text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Clock className="w-5 h-5 text-blue-400" />
                        <span>24/7 Support</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="relative h-24 flex items-center justify-center"
          style={{ opacity }}
        >
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  );
}