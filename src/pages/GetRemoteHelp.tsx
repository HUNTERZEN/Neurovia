import React, { useState } from 'react';
import { Video, Mic, MessageSquare, Star, Monitor, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const supportTypes = [
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Video Call',
    description: 'Face-to-face support with screen sharing',
    price: 30,
    duration: 30
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: 'Voice Call',
    description: 'Audio support with screen sharing',
    price: 25,
    duration: 30
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Chat Support',
    description: 'Text-based support with file sharing',
    price: 20,
    duration: 30
  }
];

const experts = [
  {
    id: 1,
    name: 'Sarah Chen',
    rating: 4.9,
    reviews: 156,
    specialties: ['Windows', 'macOS', 'Linux'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    availability: 'Available Now',
    price: 30
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    rating: 4.8,
    reviews: 142,
    specialties: ['Windows', 'Networking', 'Security'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    availability: 'Available in 15 mins',
    price: 35
  },
  {
    id: 3,
    name: 'Emily Watson',
    rating: 4.9,
    reviews: 198,
    specialties: ['macOS', 'iOS', 'Data Recovery'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    availability: 'Available Now',
    price: 40
  }
];

export function GetRemoteHelp() {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent sm:text-5xl mb-4">
            Get Remote Technical Support
          </h1>
          <p className="text-xl text-gray-400">Connect with expert technicians instantly</p>
        </motion.div>

        {/* Support Types */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {supportTypes.map((type, index) => (
            <motion.div
              key={index}
              layout
              onClick={() => setSelectedType(index)}
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`
                relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-gray-800
                ${selectedType === index ? 'border-purple-500' : 'hover:border-purple-500/30'}
              `}>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                    {type.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4">{type.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-purple-400 font-semibold">${type.price}</span>
                    <span className="text-gray-400">/{type.duration}min</span>
                  </div>
                  <motion.button 
                    className={`
                      px-4 py-2 rounded-lg font-medium bg-black text-white border
                      ${selectedType === index ? 'border-purple-500' : 'border-gray-800 hover:border-purple-500/30'}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Select
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Available Experts */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Available Experts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {experts.map((expert) => (
                  <motion.div
                    key={expert.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setSelectedExpert(expert.id)}
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`
                      relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-gray-800
                      ${selectedExpert === expert.id ? 'border-purple-500' : 'hover:border-purple-500/30'}
                    `}>
                      <div className="flex items-center mb-4">
                        <img
                          src={expert.image}
                          alt={expert.name}
                          className="w-12 h-12 rounded-full object-cover border border-gray-800"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {expert.name}
                          </h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="ml-1 text-yellow-400">{expert.rating}</span>
                            <span className="text-gray-400 ml-1">({expert.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <Monitor className="w-4 h-4 mr-2 text-purple-400" />
                          <span>{expert.specialties.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="w-4 h-4 mr-2 text-purple-400" />
                          <span>{expert.availability}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Shield className="w-4 h-4 mr-2 text-purple-400" />
                          <span>Verified Expert</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                        <div>
                          <span className="text-sm text-gray-400">Starting from</span>
                          <p className="text-xl font-semibold text-purple-400">${expert.price}/30min</p>
                        </div>
                        <motion.button 
                          className="px-6 py-2 rounded-lg font-medium bg-black text-white border border-gray-800 hover:border-purple-500/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}