import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'General',
    q: 'How does Neurovia support work?',
    a: 'Neurovia offers two primary modes of support: instant Remote Support and certified Onsite Repair / Local Repair Shops. With remote support, our certified technician connects securely to your PC or Mac to diagnose and resolve software, driver, or malware issues live. For physical hardware damage or part replacements, you can find and book an appointment with our partner repair shops near you.'
  },
  {
    category: 'General',
    q: 'What is the "No Fix, No Fee" policy?',
    a: 'If our technician is unable to resolve your software problem or provide a clear diagnosis and path to resolution during a remote session, you will not be charged. We stand 100% behind the quality and accountability of our repairs.'
  },
  {
    category: 'Remote Support',
    q: 'Is remote access to my computer safe and private?',
    a: 'Yes, absolutely. We use encrypted peer-to-peer session tools. You maintain full visibility of your screen at every moment, and you can pause or terminate the connection with a single click. Our technicians never access private files, personal folders, or passwords.'
  },
  {
    category: 'Remote Support',
    q: 'What issues can be solved remotely?',
    a: 'We can fix operating system crashes (Windows, macOS, Linux), malware & virus cleanup, driver updates, printer & peripheral configurations, email client setup, slow computer optimization, network connectivity glitches, and cloud backups.'
  },
  {
    category: 'Repair Shops',
    q: 'How do you verify local repair shops?',
    a: 'Every repair shop in our network goes through strict vetting: business registration checks, technician certification verification, shop facility inspection, and continuous customer satisfaction monitoring. All repair shops maintain a minimum 4.5+ star service rating.'
  },
  {
    category: 'Pricing',
    q: 'How much does a support session cost?',
    a: 'Remote diagnostics and basic troubleshooting start from ₹499 ($15-$25). Physical repair services vary by hardware requirement and part replacements, with transparent estimates provided before any work begins.'
  },
  {
    category: 'Future',
    q: 'What is NADT?',
    a: 'NADT (Neurovia Autonomous Device Technician) is our proprietary AI diagnostic engine currently under development, set to launch in 2027. It will autonomously diagnose hardware telemetry, predict hardware failures before they occur, and deliver instant self-healing system fixes.'
  }
];

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'General', 'Remote Support', 'Repair Shops', 'Pricing', 'Future'];

  const filteredFaqs = FAQ_DATA.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#080808] text-[#e8e8e8] min-h-screen">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Knowledge Base</span>
          <h1 className="page-title">
            Frequently asked<br /><em>questions.</em>
          </h1>
          <p className="page-sub">
            Everything you need to know about our remote support, verified repair shops, response times, and guarantees.
          </p>
        </div>
      </section>

      {/* ═══ FAQ LIST SECTION ═══ */}
      <section className="py-20">
        <div className="max-w-[880px] mx-auto px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="w-5 h-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-full pl-12 pr-6 py-3.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-[#888888] border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion Items */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#141414] border border-white/[0.08] hover:border-white/[0.16] rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-['Syne'] font-bold text-base sm:text-lg text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#888888] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-[#888888] leading-relaxed border-t border-white/[0.04]">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-[#888888]">
                No matching questions found. Try searching with different terms.
              </div>
            )}
          </div>

          {/* Bottom Help CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-[#141414] border border-white/[0.08] text-center">
            <h3 className="font-['Syne'] text-xl font-bold text-white mb-2">
              Still have a question?
            </h3>
            <p className="text-sm text-[#888888] max-w-md mx-auto mb-6">
              Can't find what you're looking for? Reach out directly to our support team and we'll be glad to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Contact our team →
              </Link>
              <Link to="/remote-help" className="btn-ghost">
                Book remote help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default FAQ;