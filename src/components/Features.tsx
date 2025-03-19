import React from 'react';
import { Video, Wrench, MessageSquare, CreditCard } from 'lucide-react';

export function Features() {
  return (
    <div className="relative bg-black -mt-24 pt-36 pb-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
      
      {/* Glowing Orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-60" />
      <div className="absolute -top-48 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Aeternex?
          </h2>
          <p className="text-gray-400 text-lg">
            Professional support for all your tech needs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Remote Assistance */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gray-800/80 rounded-xl mb-4">
                  <Video className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Remote Assistance
                </h3>
                <p className="text-gray-400">
                  Connect with tech experts via video calls for instant software support
                </p>
              </div>
            </div>
          </div>

          {/* Hardware Support */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gray-800/80 rounded-xl mb-4">
                  <Wrench className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Hardware Support
                </h3>
                <p className="text-gray-400">
                  Find verified repair shops near you for on-site hardware repairs
                </p>
              </div>
            </div>
          </div>

          {/* Expert Chat */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gray-800/80 rounded-xl mb-4">
                  <MessageSquare className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Expert Chat
                </h3>
                <p className="text-gray-400">
                  Get quick answers through our built-in chat system before booking
                </p>
              </div>
            </div>
          </div>

          {/* Secure Payments */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gray-800/80 rounded-xl mb-4">
                  <CreditCard className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Secure Payments
                </h3>
                <p className="text-gray-400">
                  Easy and secure payment system for all services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}