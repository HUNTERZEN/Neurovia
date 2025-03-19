import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MessageSquare, Monitor } from 'lucide-react';

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' }
  ],
  services: [
    { name: 'Repair Shops', href: '/repair-shops' },
    { name: 'Remote Support', href: '/remote-help' },
    { name: 'Expert Chat', href: '/remote-help?type=chat' },
    { name: 'Video Consultation', href: '/remote-help?type=video' },
    { name: 'Device Diagnostics', href: '/diagnostics' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' }
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin
    },
    {
      name: 'YouTube',
      href: '#',
      icon: Youtube
    }
  ]
};

export function Footer() {
  return (
    <footer className="relative bg-gray-950" aria-labelledby="footer-heading">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
      
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="relative max-w-7xl mx-auto py-12 px-6">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6 xl:col-span-1">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative bg-black rounded-full p-2">
                    <Monitor className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="ml-3 text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Aeternex
                </span>
              </Link>
              <Link 
                to="/remote-help?type=chat" 
                className="relative group inline-block"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative flex items-center px-4 py-2 bg-black rounded-lg">
                  <MessageSquare className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-sm font-medium text-white">Expert Chat</span>
                </div>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Professional tech support and repair services, available instantly online or at local repair shops.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">
                  Company
                </h3>
                <ul className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">
                  Services
                </h3>
                <ul className="mt-4 space-y-3">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Aeternex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 