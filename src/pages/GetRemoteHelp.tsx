import React, { useState } from 'react';
import { Video, Mic, MessageSquare, Star, Monitor, Clock, Shield } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Get Remote Technical Support</h1>
        <p className="text-xl text-gray-400">Connect with expert technicians instantly</p>
      </div>

      {/* Support Types */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {supportTypes.map((type, index) => (
          <div
            key={index}
            onClick={() => setSelectedType(index)}
            className={`
              bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer
              transition-all duration-200 hover:bg-gray-800
              ${selectedType === index ? 'ring-2 ring-purple-500' : ''}
            `}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500">
                {type.icon}
              </div>
              <h3 className="ml-3 text-xl font-semibold text-white">{type.title}</h3>
            </div>
            <p className="text-gray-400 mb-4">{type.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-purple-500 font-semibold">${type.price}</span>
                <span className="text-gray-400">/{type.duration}min</span>
              </div>
              <button 
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${selectedType === index 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}
                `}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Available Experts */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Available Experts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.id}
              onClick={() => setSelectedExpert(expert.id)}
              className={`
                bg-gray-800 rounded-xl p-6 cursor-pointer
                transition-all duration-200 hover:bg-gray-700
                ${selectedExpert === expert.id ? 'ring-2 ring-purple-500' : ''}
              `}
            >
              <div className="flex items-center mb-4">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-3">
                  <h3 className="font-semibold text-white">{expert.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-yellow-400">{expert.rating}</span>
                    <span className="text-gray-400 ml-1">({expert.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Monitor className="w-4 h-4 mr-2" />
                  <span>{expert.specialties.join(', ')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{expert.availability}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Verified Expert</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div>
                  <span className="text-sm text-gray-400">Starting from</span>
                  <p className="text-xl font-semibold text-purple-500">${expert.price}/30min</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}