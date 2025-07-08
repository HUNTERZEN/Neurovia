import React from 'react';
import { Instagram, Twitter, Linkedin, Github, User } from 'lucide-react';

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

export function Founders() {
  const founders = [
    {
      name: 'Madhurjya Bordoloi',
      role: 'CEO & Founder',
      roleColor: 'text-purple-400',
      bio: 'Part time entreprenuer, doing BS Computer Science at UoPeople',
      image: '/images/founders/madhurjya.jpg',
      socials: [
        { type: 'instagram', url: 'https://instagram.com/madhurjya_bordoloi' },
        { type: 'twitter', url: 'https://twitter.com/madhurjya_b' },
        { type: 'linkedin', url: 'https://linkedin.com/in/madhurjya-bordoloi' },
        { type: 'github', url: 'https://github.com/madhurjya-bordoloi' }
      ]
    },
    {
      name: 'Himanta Goswami',
      role: 'CMO & Sales Lead',
      roleColor: 'text-purple-400',
      bio: 'Ex-Apple product manager passionate about creating intuitive user experiences.',
      image: '/images/founders/himanta.jpg',
      socials: [
        { type: 'linkedin', url: 'https://linkedin.com/in/himanta-goswami' }
      ]
    },
    {
      name: 'Subhankar',
      role: 'CTO & Security Lead',
      roleColor: 'text-purple-400',
      bio: 'Cybersecurity veteran with expertise in building secure, enterprise-grade solutions.',
      image: '/images/founders/subhankar.jpg',
      socials: [
        { type: 'instagram', url: 'https://instagram.com/subhankar' },
        { type: 'twitter', url: 'https://twitter.com/subhankar' },
        { type: 'linkedin', url: 'https://linkedin.com/in/subhankar' },
        { type: 'github', url: 'https://github.com/subhankar' }
      ]
    },
    {
      name: 'Kunal',
      role: 'CTO & Dev Lead',
      roleColor: 'text-purple-400',
      bio: 'Cybersecurity veteran with expertise in building secure, enterprise-grade solutions.',
      image: '/images/founders/kunal.jpg',
      socials: [
        { type: 'instagram', url: 'https://instagram.com/kunal' },
        { type: 'twitter', url: 'https://twitter.com/kunal' },
        { type: 'linkedin', url: 'https://linkedin.com/in/kunal' },
        { type: 'github', url: 'https://github.com/kunal' }
      ]
    }
  ];

  const SocialIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-black">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Meet Our Founders
          </h2>
          <h4 className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto text-center">
            The visionaries behind Neurovia, bringing together decades of experience in technology and innovation.
          </h4>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {founders.map((founder, index) => (
            <div key={founder.name} className="group relative">
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
              
              {/* Founder Card */}
              <div className="relative bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 h-full flex flex-col">
                {/* Profile Image */}
                <div className="relative w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200" />
                  <div className="relative aspect-square overflow-hidden rounded-full border-2 border-gray-800">
                    <ImageWithFallback
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                    {founder.name}
                  </h3>
                  <p className={`${founder.roleColor} text-sm font-medium mb-3`}>
                    {founder.role}
                  </p>
                  <p className="text-sm text-gray-400 mb-4 flex-1">
                    {founder.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center items-center space-x-3">
                    {founder.socials.map((social) => (
                      <a
                        key={social.type}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                        aria-label={`${founder.name}'s ${social.type}`}
                      >
                        <SocialIcon type={social.type} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 