import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MessageSquare, Monitor } from 'lucide-react';

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' }
  ],
  services: [
    { name: 'Repair Shops', href: '/repair-shops' },
    { name: 'Remote Support', href: '/remote-help' },
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
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative bg-black rounded-full p-2">
                    <Monitor className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="ml-3 text-lg font-bold text-white">Neurovia</span>
              </Link>
            </div>
            <p className="text-gray-400 text-sm text-center sm:text-left">
              Professional tech support and repair services, available instantly online or at local repair shops.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="mt-8 sm:mt-0">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider text-center sm:text-left">
                  Company
                </h3>
                <ul className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name} className="text-center sm:text-left">
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
              <div className="mt-8 sm:mt-0">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider text-center sm:text-left">
                  Services
                </h3>
                <ul className="mt-4 space-y-3">
                  {navigation.services.map((item) => (
                    <li key={item.name} className="text-center sm:text-left">
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
            <div className="mt-8 sm:mt-0">
              <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider text-center sm:text-left">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name} className="text-center sm:text-left">
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
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300" aria-label={item.name}>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Neurovia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 