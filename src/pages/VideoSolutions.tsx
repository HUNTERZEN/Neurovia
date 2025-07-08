import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Check } from 'lucide-react';
import clsx from 'clsx';

interface VideoCategory {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  isPremium: boolean;
}

export function VideoSolutions() {
  const [selectedCategory, setSelectedCategory] = useState<string>('windows');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const categories: VideoCategory[] = [
    {
      id: 'windows',
      title: 'Windows Solutions',
      description: 'Common Windows errors and their fixes',
      videos: [
        {
          id: 'win1',
          title: 'Fix Blue Screen of Death (BSOD)',
          duration: '15:30',
          thumbnail: '/images/bsod-thumb.jpg',
          isPremium: true,
        },
        {
          id: 'win2',
          title: 'Windows Update Troubleshooting',
          duration: '12:45',
          thumbnail: '/images/update-thumb.jpg',
          isPremium: true,
        },
      ],
    },
    {
      id: 'mac',
      title: 'macOS Solutions',
      description: 'Common macOS issues and troubleshooting',
      videos: [
        {
          id: 'mac1',
          title: 'Fix Kernel Panic Issues',
          duration: '10:20',
          thumbnail: '/images/kernel-thumb.jpg',
          isPremium: true,
        },
        {
          id: 'mac2',
          title: 'macOS Performance Optimization',
          duration: '18:15',
          thumbnail: '/images/performance-thumb.jpg',
          isPremium: false,
        },
      ],
    },
  ];

  const handleVideoClick = (isPremium: boolean) => {
    if (isPremium) {
      setShowPremiumModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Video Solutions Library
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access our curated collection of expert solutions for common tech problems
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories and Videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Category Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={clsx(
                'px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              )}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .find((c) => c.id === selectedCategory)
            ?.videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleVideoClick(video.isPremium)}
              >
                <div className="relative aspect-video bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {video.isPremium ? (
                      <Lock className="w-12 h-12 text-purple-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <Play className="w-12 h-12 text-purple-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">{video.title}</h3>
                    {video.isPremium && (
                      <span className="px-2 py-1 text-xs font-medium text-purple-400 bg-purple-400/10 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{video.duration}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Unlock Premium Content
            </h3>
            <p className="text-gray-400 mb-6">
              Get unlimited access to our premium video solutions and expert content.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-purple-400 mt-0.5 mr-3" />
                <p className="text-gray-300">Access to all premium video solutions</p>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-purple-400 mt-0.5 mr-3" />
                <p className="text-gray-300">Downloadable resources and guides</p>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-purple-400 mt-0.5 mr-3" />
                <p className="text-gray-300">Priority support from our experts</p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Subscribe Now - ₹149/month
              </button>
              <button
                onClick={() => setShowPremiumModal(false)}
                className="w-full py-3 px-4 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 