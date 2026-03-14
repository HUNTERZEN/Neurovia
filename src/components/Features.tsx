import React from 'react';
import { Video, Wrench, MessageSquare, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      icon: <Video className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Remote Assistance",
      description: "Connect with tech experts via video calls for instant software support"
    },
    {
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Hardware Support",
      description: "Find verified repair shops near you for on-site hardware repairs"
    },
    {
      icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Expert Chat",
      description: "Get quick answers through our built-in chat system before booking"
    },
    {
      icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Secure Payments",
      description: "Easy and secure payment system for all services"
    }
  ];

  return (
    <section className="relative bg-black pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
      
      {/* Glowing Orbs */}
      <div className="absolute bottom-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/20 rounded-full blur-3xl opacity-60" />
      <div className="absolute -top-48 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/20 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="block">Why Choose Neurovia?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Professional support for all your tech needs
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-gray-800/80 rounded-xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}