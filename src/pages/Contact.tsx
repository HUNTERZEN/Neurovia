import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1200));

    setSending(false);
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="bg-[#080808] text-[#e8e8e8] min-h-screen">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Contact</span>
          <h1 className="page-title">
            Let's talk<br /><em>tech.</em>
          </h1>
          <p className="page-sub">
            Have a question, need a quote, or just want to say hello? We usually respond within a few hours.
          </p>
        </div>
      </section>

      {/* ═══ CONTACT DETAILS & FORM ═══ */}
      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="contact-grid">
            {/* Left Info Column */}
            <div className="contact-info">
              <h2>
                Get in<br /><em className="italic text-[#888888]">touch.</em>
              </h2>

              <div className="contact-detail">
                <div className="cd-item">
                  <span className="cd-label">Email</span>
                  <a href="mailto:support@neurovia.site" className="cd-value hover:text-white transition-colors">
                    support@neurovia.site
                  </a>
                </div>

                <div className="cd-item">
                  <span className="cd-label">Phone & WhatsApp</span>
                  <a href="tel:+918822096485" className="cd-value hover:text-white transition-colors">
                    +91 88220 96485
                  </a>
                </div>

                <div className="cd-item">
                  <span className="cd-label">Emergency Support</span>
                  <a href="tel:+918822096485" className="cd-value hover:text-white transition-colors">
                    +91 88220 96485
                  </a>
                </div>

                <div className="cd-item">
                  <span className="cd-label">Office</span>
                  <span className="text-sm text-[#888888] leading-relaxed">
                    Guwahati, Assam<br />India — 781001
                  </span>
                </div>

                <div className="cd-item">
                  <span className="cd-label">Business Hours</span>
                  <span className="text-sm text-[#888888]">
                    Mon – Sat, 9:00 AM – 7:00 PM IST
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-12 pt-8 border-t border-white/[0.08]">
                <p className="text-xs uppercase tracking-widest text-[#888888] font-semibold mb-4">
                  Follow us
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/neurovia-nexus-pvt-ltd/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-sm font-bold text-[#888888] hover:text-white hover:border-white/30 transition-all"
                  >
                    in
                  </a>
                  <a
                    href="https://x.com/computech08"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-sm font-bold text-[#888888] hover:text-white hover:border-white/30 transition-all"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://www.instagram.com/neurovianexus?igsh=MXFmbnNlc2s4eDRzOQ=="
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-sm font-bold text-[#888888] hover:text-white hover:border-white/30 transition-all"
                  >
                    ig
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form">
              {!sent ? (
                <form onSubmit={handleSubmit} id="contact-form-inner">
                  <h3 className="font-['Syne'] text-2xl font-bold text-white mb-6">
                    Send a message
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="c-name">Name *</label>
                      <input
                        type="text"
                        id="c-name"
                        name="name"
                        required
                        className="form-input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="c-email">Email *</label>
                      <input
                        type="email"
                        id="c-email"
                        name="email"
                        required
                        className="form-input"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="c-phone">Phone</label>
                    <input
                      type="tel"
                      id="c-phone"
                      name="phone"
                      className="form-input"
                      placeholder="+91 88220 96485"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="c-subject">Subject *</label>
                    <input
                      type="text"
                      id="c-subject"
                      name="subject"
                      required
                      className="form-input"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="c-message">Message *</label>
                    <textarea
                      id="c-message"
                      name="message"
                      required
                      rows={5}
                      className="form-input"
                      placeholder="Tell us what's going on..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary form-submit"
                  >
                    {sending ? 'Sending message...' : 'Send message →'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="font-['Syne'] text-2xl font-bold text-white mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-[#888888] max-w-sm mx-auto">
                    We'll get back to you within a few hours. Check your inbox for a confirmation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}