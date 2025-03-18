import React from 'react';
import { Monitor, Smartphone, Wrench, Video, MessageSquare, CreditCard } from 'lucide-react';

const features = [
  {
    icon: <Video className="w-8 h-8" />,
    title: "Remote Assistance",
    description: "Connect with tech experts via video calls, voice calls, or chat for instant software support"
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Hardware Support",
    description: "Find verified repair shops near you for on-site hardware repairs and maintenance"
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Expert Chat",
    description: "Get quick answers through our built-in chat system before booking a session"
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Secure Payments",
    description: "Easy and secure payment system for all services"
  }
];

export function Features() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Aeternex?
          </h2>
          <p className="text-xl text-gray-400">
            Professional support for all your tech needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-center mb-4 text-primary-light">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}