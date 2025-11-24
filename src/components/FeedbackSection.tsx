import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Quote } from 'lucide-react';

interface FeedbackVideo {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  feedback: string;
  youtubeId: string; // Changed from videoUrl to youtubeId
  thumbnail: string;
  duration: string;
}

const feedbackVideos: FeedbackVideo[] = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    role: 'Senior Partner Technician',
    company: 'NK Tech Care',
    rating: 5,
    feedback: 'Working with Neurovia has been exceptional. Their remote support platform is intuitive and their team is highly professional.',
    youtubeId: 'pFTidwuIAvI', // ✅ YouTube Short ID from your link
    thumbnail: 'https://img.youtube.com/vi/pFTidwuIAvI/maxresdefault.jpg', // Auto YouTube thumbnail
    duration: '0:59' // YouTube Short duration
  }
];

export function FeedbackSection() {
  const [showVideo, setShowVideo] = useState(false);
  const [currentIndex] = useState(0); // Since we only have 1 video
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Feedback from Partner Technicians
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear what our trusted partner technicians say about working with Neurovia
          </p>
        </motion.div>

        {/* Main Feedback Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
              
              <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800">
                {showVideo ? (
                  // YouTube Embed
                  <div className="relative w-full h-64 md:h-80">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${feedbackVideos[currentIndex].youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      title={`${feedbackVideos[currentIndex].name} Feedback`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    
                    {/* Close Video Button */}
                    <button
                      onClick={handleCloseVideo}
                      className="absolute top-4 right-4 w-10 h-10 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors text-xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  // Thumbnail with Play Button
                  <div className="relative w-full h-64 md:h-80">
                    <img
                      src={feedbackVideos[currentIndex].thumbnail}
                      alt={feedbackVideos[currentIndex].name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if YouTube thumbnail fails
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.youtube.com/vi/${feedbackVideos[currentIndex].youtubeId}/hqdefault.jpg`;
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button
                        onClick={handlePlayVideo}
                        className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl"
                      >
                        <Play className="w-10 h-10 ml-1 fill-white" />
                      </button>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      {feedbackVideos[currentIndex].duration}
                    </div>

                    {/* YouTube Short Badge */}
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      YouTube Short
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Feedback Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quote */}
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 w-8 h-8 text-purple-400 opacity-50" />
              <blockquote className="text-xl md:text-2xl text-gray-100 font-medium leading-relaxed pl-8">
                "{feedbackVideos[currentIndex].feedback}"
              </blockquote>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(feedbackVideos[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-gray-300 ml-3 text-lg font-medium">
                {feedbackVideos[currentIndex].rating}.0 / 5.0
              </span>
            </div>

            {/* Technician Info */}
            <div className="border-l-4 border-purple-500 pl-6 bg-gradient-to-r from-purple-500/10 to-transparent py-4 rounded-r-lg">
              <h4 className="text-2xl font-bold text-white mb-2">
                {feedbackVideos[currentIndex].name}
              </h4>
              <p className="text-purple-400 font-medium text-lg mb-1">
                {feedbackVideos[currentIndex].role}
              </p>
              <p className="text-gray-300 text-lg">
                {feedbackVideos[currentIndex].company}
              </p>
            </div>

            {/* Watch on YouTube Button */}
            <div className="pt-4">
              <a
                href={`https://youtube.com/shorts/${feedbackVideos[currentIndex].youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a2.999 2.999 0 0 0-2.109-2.109C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.389.531A2.999 2.999 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.999 2.999 0 0 0 2.109 2.109C4.495 20.454 12 20.454 12 20.454s7.505 0 9.389-.531a2.999 2.999 0 0 0 2.109-2.109C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
            </div>
          </motion.div>
        </div>

        {/* Single Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="relative group cursor-pointer transition-all hover:scale-105" onClick={handlePlayVideo}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            
            <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800">
              <div className="relative mb-4">
                <img 
                  src={feedbackVideos[currentIndex].thumbnail} 
                  alt={feedbackVideos[currentIndex].name}
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${feedbackVideos[currentIndex].youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-90" />
                </div>
              </div>
              
              <h4 className="font-bold text-white text-lg mb-2">{feedbackVideos[currentIndex].name}</h4>
              <p className="text-purple-400 text-base mb-1">{feedbackVideos[currentIndex].role}</p>
              <p className="text-gray-400 text-sm">{feedbackVideos[currentIndex].company}</p>
              
              <div className="flex items-center gap-1 mt-3">
                {[...Array(feedbackVideos[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
