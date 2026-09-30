import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-[#080808] border-t border-white/[0.08] text-[#e8e8e8] pt-16 pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-12 lg:gap-16 mb-14">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group text-white">
              <span className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm font-['Syne']">
                N
              </span>
              <span className="font-['Syne'] text-xl font-bold tracking-tight text-white">
                Neurovia Nexus
              </span>
            </Link>
            
            <p className="text-sm text-[#888888] leading-relaxed max-w-sm">
              IT support, software solutions, and AI innovation. Assam, India. Available instantly online or at verified local repair shops.
            </p>
            
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/company/neurovia-nexus-pvt-ltd/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/neurovianexus?igsh=MXFmbnNlc2s4eDRzOQ=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/computech08"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/30 transition-all duration-200 text-xs font-bold"
              >
                𝕏
              </a>
              <a
                href="https://youtube.com/@computechsolutions-ks6hg?si=ihbgxxWD7626op7m"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Services */}
            <div>
              <h5 className="font-['Syne'] text-xs font-semibold tracking-widest uppercase text-white mb-4">
                Services
              </h5>
              <ul className="space-y-2.5 text-sm text-[#888888]">
                <li><Link to="/services" className="hover:text-white transition-colors">All Services</Link></li>
                <li><Link to="/remote-help" className="hover:text-white transition-colors">Remote Support</Link></li>
                <li><Link to="/repair-shops" className="hover:text-white transition-colors">Onsite &amp; Shops</Link></li>
                <li><Link to="/video-solutions" className="hover:text-white transition-colors">Video Solutions</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="font-['Syne'] text-xs font-semibold tracking-widest uppercase text-white mb-4">
                Company
              </h5>
              <ul className="space-y-2.5 text-sm text-[#888888]">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/book" className="hover:text-white transition-colors">Book Support</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="font-['Syne'] text-xs font-semibold tracking-widest uppercase text-white mb-4">
                Legal
              </h5>
              <ul className="space-y-2.5 text-sm text-[#888888]">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-['Syne'] text-xs font-semibold tracking-widest uppercase text-white mb-4">
                Contact
              </h5>
              <div className="space-y-2 text-sm text-[#888888]">
                <div><a href="mailto:support@neurovia.site" className="hover:text-white transition-colors text-xs break-all">support@neurovia.site</a></div>
                <div><a href="tel:+918822096485" className="hover:text-white transition-colors text-xs">+91 88220 96485</a></div>
                <div className="text-xs text-[#666666] pt-1">Guwahati, Assam<br />India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower / Bottom Bar of the Footer */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <span>© {currentYear} Neurovia Nexus Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}