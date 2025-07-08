import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, HelpCircle, Mail, Settings, Users, Shield, Clock, Image } from 'lucide-react';

const faqs = [
  {
    icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    question: "Do you offer refund?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our services. Terms and conditions apply."
  },
  {
    icon: <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
    question: "Can I try free trial now?",
    answer: "We offer a 7-day free trial for new users to test our premium features. No credit card required to start."
  },
  {
    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
    question: "How can I reach support?",
    answer: "Our support team is available 24/7 through live chat, email, or phone. Premium users get priority support access."
  },
  {
    icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />,
    question: "Will it work for me?",
    answer: "Our service is compatible with all major devices and operating systems. We provide comprehensive documentation and setup guides."
  },
  {
    icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
    question: "How much does it cost?",
    answer: "We offer flexible pricing plans starting from $9.99/month. Enterprise solutions are available for larger organizations."
  },
  {
    icon: <Image className="w-5 h-5 sm:w-6 sm:h-6" />,
    question: "How to change profile pics?",
    answer: "You can easily update your profile picture from your account settings. We support JPG, PNG, and GIF formats up to 5MB."
  }
];

const supportTeam = [
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Sarah Chen"
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Michael Rodriguez"
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Emily Watson"
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Tom Wilson"
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Lisa Anderson"
  }
];

export function FAQ() {
  return (
    <div className="relative min-h-screen bg-black py-16 sm:py-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our services and platform
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500/30 h-full">
                <div className="flex items-center mb-4">
                  <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg text-purple-400">
                    {faq.icon}
                  </div>
                  <h3 className="ml-3 text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-400">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Team Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Still Have Questions?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Contact us anytime and we'll get back to you as soon as possible.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base sm:text-lg font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
} 