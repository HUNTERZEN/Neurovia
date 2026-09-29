import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Check, X } from 'lucide-react';
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
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="nv-section-label">Video Library</span>
          <h1 className="page-title !mt-2 !mb-3">
            Watch us <em>fix it live.</em>
          </h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Access our curated collection of expert walkthroughs, diagnostics, and repairs.
          </p>
        </div>
      </section>

      {/* Categories and Videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Category Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={clsx(
                'px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border',
                selectedCategory === category.id
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-[#888888] border-white/10 hover:border-white/30 hover:text-white'
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
                className="bg-[#141414] border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer group transition-all"
                onClick={() => handleVideoClick(video.isPremium)}
              >
                <div className="relative aspect-video bg-[#18181c]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-[#080808] text-white transition-all">
                      {video.isPremium ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-['Syne'] text-base font-bold text-white line-clamp-1">{video.title}</h3>
                    {video.isPremium && (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold text-white bg-white/10 border border-white/15 rounded-full uppercase tracking-wider">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#888888]">{video.duration}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#121214] border border-white/[0.1] rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-5 right-5 text-[#888888] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="nv-section-label">Unlimited Access</span>
            <h3 className="font-['Syne'] text-2xl font-bold text-white mb-2">
              Unlock Premium Content
            </h3>
            <p className="text-xs text-[#888888] mb-6">
              Get unlimited access to our entire catalog of deep-dive repair sessions and masterclass diagnostics.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <p className="text-xs text-[#e8e8e8]">Access to all 100+ premium video solutions</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <p className="text-xs text-[#e8e8e8]">Downloadable schematics and repair guides</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <p className="text-xs text-[#e8e8e8]">Priority 1-on-1 technician assistance</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="btn-primary !w-full !rounded-xl !py-3.5 !text-xs font-bold">
                Subscribe Now — ₹149/month
              </button>
              <button
                onClick={() => setShowPremiumModal(false)}
                className="w-full py-2.5 text-xs text-[#888888] hover:text-white transition-colors"
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