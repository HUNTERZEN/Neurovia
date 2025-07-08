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
    <section className="relative min-h-screen pt-20 overflow-hidden">
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        </div>

        {/* Animated Orbs */}
        <motion.div
          className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl"
          style={{ x: leftOrbX, opacity: orbOpacity }}
        />
        <motion.div
          className="absolute right-1/4 top-1/3 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl"
          style={{ x: rightOrbX, opacity: orbOpacity }}
        />

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
              {/* Content Grid */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                {/* Left Content - Hero Text */}
                <motion.div
                  className="text-center lg:text-left mb-12 lg:mb-0"
                  style={{ y, opacity, scale }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                      Expert Tech Support
                    </span>
                    <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      At Your Fingertips
                    </span>
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
                    Get instant help from verified tech experts or find trusted local repair shops. 
                    Professional support for all your device issues, available 24/7.
                  </p>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8 sm:mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Link to="/remote-help" className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                      <button className="relative w-full px-6 py-3 bg-black rounded-lg text-white font-semibold">
                        Get Remote Help
                        <ArrowRight className="inline-block ml-2 w-5 h-5" />
                      </button>
                    </Link>
                    <Link to="/repair-shops" className="w-full sm:w-auto px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-300 hover:text-white font-semibold transition-colors text-center">
                      Find Repair Shops
                    </Link>
                  </motion.div>
                  
                  {/* Stats */}
                  <motion.div 
                    className="mt-12 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <div className="text-center sm:text-left">
                      <h3 className="text-3xl font-bold text-white">500+</h3>
                      <p className="text-gray-400">verified experts</p>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-gray-800" />
                    <div className="text-center sm:text-left">
                      <h3 className="text-3xl font-bold text-white">24/7</h3>
                      <p className="text-gray-400">support</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Content - Service Card */}
                <motion.div
                  className="relative lg:ml-auto"
                  style={{ y: rightContentY }}
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div 
                        className="flex items-center justify-center gap-2 p-4 bg-gray-800 rounded-xl text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Shield className="w-5 h-5 text-purple-400" />
                        <span>Verified Experts</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-center gap-2 p-4 bg-gray-800 rounded-xl text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Clock className="w-5 h-5 text-blue-400" />
                        <span>24/7 Support</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
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