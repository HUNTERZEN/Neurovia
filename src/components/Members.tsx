import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, User } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

function ImageWithFallback({ src, alt, className }: ImageWithFallbackProps) {
  const [error, setError] = React.useState(false);

  return error ? (
    <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
      <User className="w-1/3 h-1/3 text-gray-600" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover object-center`}
      onError={() => setError(true)}
    />
  );
}

const members = [
  {
    name: 'Manos Jyoti Deka',
    image: '/images/members/manos.jpg',
    linkedin: 'https://www.linkedin.com/in/manos-jyoti-deka-534b96305'
  },
  {
    name: 'Bhargob',
    image: '/images/members/bhargob.jpg',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Junaid',
    image: '/images/members/junaid.jpg',
    linkedin: 'https://www.linkedin.com/in/junaid-shehrie-8a590928b'
  }
];

export function Members() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        
        {/* Added Purple Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Meet Our Members
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate individuals who are dedicated to building a better future
          </p>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-purple-500/30 transition-colors">
                {/* Member Image */}
                <div className="relative mb-4">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-200" />
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                    {member.name}
                  </h3>

                  {/* LinkedIn Link */}
                  <div className="flex justify-center">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 