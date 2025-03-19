import React from 'react';
import { Shield, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  const values = [
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Trust & Security",
      description: "We prioritize your security and privacy in every interaction, ensuring a safe and reliable tech support experience."
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: "Expert Solutions",
      description: "Our network of verified experts provides precise, efficient solutions tailored to your specific tech needs."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Community Focus",
      description: "Building a supportive tech community where knowledge is shared and problems are solved together."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: "Innovation",
      description: "Constantly evolving our services and solutions to stay ahead of the rapidly changing tech landscape."
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                About Aeternex
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Empowering users with expert tech support and innovative solutions for a seamlessly connected digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25" />
            
            {/* Content Card */}
            <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2024, Aeternex emerged from a simple yet powerful idea: making expert tech support accessible to everyone. Our founders, experienced in various aspects of technology and customer service, recognized the growing need for reliable, on-demand tech assistance.
                </p>
                <p>
                  What started as a small team of passionate tech experts has grown into a comprehensive platform connecting users with verified professionals and trusted repair shops worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
                
                {/* Content */}
                <div className="relative bg-gray-900/80 backdrop-blur-xl p-6 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{value.title}</h3>
                  </div>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25" />
            
            {/* Content Card */}
            <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join our community of tech experts and users. Get the support you need or share your expertise with others.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/signup"
                  className="relative group inline-block"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                  <button className="relative px-6 py-3 bg-black rounded-lg text-white font-semibold">
                    Join Aeternex
                  </button>
                </Link>
                <Link
                  to="/remote-help"
                  className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-300 hover:text-white font-semibold transition-colors"
                >
                  Get Help Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 