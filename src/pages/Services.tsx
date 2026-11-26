import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CreditCard, Shield } from 'lucide-react';
import API_BASE_URL from '../config/api';
import { DEFAULT_SERVICE_CATALOG, ServicePackage } from '../data/serviceCatalog';
import { RazorpayCheckoutModal } from '../components/RazorpayCheckoutModal';

export default function Services() {
  const [catalog, setCatalog] = useState<ServicePackage[]>(DEFAULT_SERVICE_CATALOG);
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/payments/services`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data?.services) && data.services.length > 0) {
          setCatalog(data.services);
        }
      })
      .catch(() => {
        // Keep static catalog fallback
      });
  }, []);

  const byCategory = (cat: ServicePackage['category']) =>
    catalog.filter((item) => item.category === cat);

  const renderPackages = (cat: ServicePackage['category']) => {
    const items = byCategory(cat);
    return (
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-2xl p-6 bg-[#121214] border transition-all duration-200 flex flex-col justify-between ${
              pkg.popular
                ? 'border-[#4f7fff]/50 shadow-[0_0_30px_rgba(79,127,255,0.12)]'
                : 'border-white/[0.08] hover:border-white/20'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-[#4f7fff] text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </span>
            )}

            <div>
              <div className="flex items-baseline justify-between gap-2 mb-3">
                <span className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white">
                  ₹{pkg.amountInr.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#888888]">{pkg.duration}</span>
              </div>

              <h3 className="font-['Syne'] text-lg font-bold text-white mb-1.5 leading-snug">
                {pkg.title}
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed mb-5">{pkg.subtitle}</p>

              <ul className="space-y-2 mb-6 border-t border-white/[0.06] pt-4">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs text-[#cccccc]">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setSelectedService(pkg)}
                className="nv-btn-primary !w-full !py-3 !text-xs flex items-center justify-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Pay ₹{pkg.amountInr.toLocaleString('en-IN')} · Book Now →
              </button>
              <Link
                to={`/book?service=${encodeURIComponent(pkg.id)}`}
                className="text-center text-[11px] text-[#888888] hover:text-white py-1 transition-colors"
              >
                Or book with Pay-After-Fix →
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#080808] text-[#e8e8e8] min-h-screen">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Our Services &amp; Transparent Pricing</span>
          <h1 className="page-title">
            Every tech problem,<br /><em>one team.</em>
          </h1>
          <p className="page-sub">
            Remote or onsite, personal or enterprise — select any service below to book instantly with secure Razorpay checkout (UPI, Google Pay, Cards, NetBanking) or Pay-After-Fix.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#cccccc]">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Instant Razorpay Checkout · UPI, Cards &amp; NetBanking · No Fix, No Fee Guarantee</span>
          </div>
        </div>
      </section>

      {/* ═══ 01 REMOTE SUPPORT ═══ */}
      <section className="service-detail">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="service-detail-grid">
            <div className="svc-left">
              <span className="svc-num">01</span>
              <h2>Remote <em>Support</em></h2>
              <p>Instant help over a secure remote connection. We access your device (with your permission) and fix issues live while you watch.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedService(byCategory('Remote Support')[0] || null)}
                  className="nv-btn-primary inline-flex"
                >
                  Pay &amp; Start Session →
                </button>
                <Link to="/book?service=remote-quick-fix" className="nv-btn-outline inline-flex">
                  Schedule slot
                </Link>
              </div>
            </div>
            <div className="svc-right">
              <div className="svc-list">
                <div className="svc-item"><span>→</span> OS Troubleshooting (Windows, macOS, Linux)</div>
                <div className="svc-item"><span>→</span> Virus &amp; Malware Removal</div>
                <div className="svc-item"><span>→</span> Software Installation &amp; Configuration</div>
                <div className="svc-item"><span>→</span> Driver Updates</div>
                <div className="svc-item"><span>→</span> Email Setup (Outlook, Gmail, Business)</div>
                <div className="svc-item"><span>→</span> Performance Optimization</div>
                <div className="svc-item"><span>→</span> Remote Diagnostics</div>
                <div className="svc-item"><span>→</span> Printer Configuration</div>
              </div>
            </div>
          </div>

          {renderPackages('Remote Support')}
        </div>
      </section>

      <div className="section-divider max-w-[1160px] mx-auto" />

      {/* ═══ 02 ONSITE REPAIR ═══ */}
      <section className="service-detail">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="service-detail-grid reverse">
            <div className="svc-right">
              <div className="svc-list">
                <div className="svc-item"><span>→</span> Desktop &amp; Laptop Repair</div>
                <div className="svc-item"><span>→</span> Hardware Replacement (RAM, SSD, Battery)</div>
                <div className="svc-item"><span>→</span> Network Installation &amp; WiFi Setup</div>
                <div className="svc-item"><span>→</span> CCTV Installation</div>
                <div className="svc-item"><span>→</span> Office IT Setup</div>
                <div className="svc-item"><span>→</span> Data Recovery</div>
                <div className="svc-item"><span>→</span> Screen Replacement</div>
              </div>
            </div>
            <div className="svc-left">
              <span className="svc-num">02</span>
              <h2>Onsite <em>Repair</em></h2>
              <p>A certified technician comes to you. No hauling your equipment anywhere — we bring the workshop to your home or office.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedService(byCategory('Onsite Repair')[0] || null)}
                  className="nv-btn-primary inline-flex"
                >
                  Pay &amp; Schedule Visit →
                </button>
                <Link to="/book?service=onsite-visit-diag" className="nv-btn-outline inline-flex">
                  Pay after fix
                </Link>
              </div>
            </div>
          </div>

          {renderPackages('Onsite Repair')}
        </div>
      </section>

      <div className="section-divider max-w-[1160px] mx-auto" />

      {/* ═══ 03 BUSINESS IT ═══ */}
      <section className="service-detail">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="service-detail-grid">
            <div className="svc-left">
              <span className="svc-num">03</span>
              <h2>Business <em>IT</em></h2>
              <p>From 5-person startups to 500-person enterprises — we keep your technology running so your team can focus on the actual work.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedService(byCategory('Business IT')[0] || null)}
                  className="nv-btn-primary inline-flex"
                >
                  Start Business Plan →
                </button>
                <Link to="/contact" className="nv-btn-outline inline-flex">
                  Custom enterprise quote
                </Link>
              </div>
            </div>
            <div className="svc-right">
              <div className="svc-list">
                <div className="svc-item"><span>→</span> Annual Maintenance Contracts (AMC)</div>
                <div className="svc-item"><span>→</span> Managed IT Services</div>
                <div className="svc-item"><span>→</span> Server Administration</div>
                <div className="svc-item"><span>→</span> Backup &amp; Disaster Recovery</div>
                <div className="svc-item"><span>→</span> Employee IT Support</div>
                <div className="svc-item"><span>→</span> Infrastructure Management</div>
                <div className="svc-item"><span>→</span> Cybersecurity Audits</div>
              </div>
            </div>
          </div>

          {renderPackages('Business IT')}
        </div>
      </section>

      <div className="section-divider max-w-[1160px] mx-auto" />

      {/* ═══ 04 SOFTWARE & CLOUD ═══ */}
      <section className="service-detail">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="service-detail-grid reverse">
            <div className="svc-right">
              <div className="svc-list">
                <div className="svc-item"><span>→</span> Website Development</div>
                <div className="svc-item"><span>→</span> Web &amp; Mobile Applications</div>
                <div className="svc-item"><span>→</span> AI Chatbots &amp; Automation</div>
                <div className="svc-item"><span>→</span> Cloud Migration (AWS, Azure, GCP)</div>
                <div className="svc-item"><span>→</span> Cloud Architecture Design</div>
                <div className="svc-item"><span>→</span> DevOps &amp; CI/CD</div>
              </div>
            </div>
            <div className="svc-left">
              <span className="svc-num">04</span>
              <h2>Software &amp; <em>Cloud</em></h2>
              <p>We build products and infrastructure that scale. From a landing page to a full SaaS platform — scoped to your exact needs.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedService(byCategory('Software & Cloud')[1] || byCategory('Software & Cloud')[0] || null)}
                  className="nv-btn-primary inline-flex"
                >
                  Kickoff Project →
                </button>
                <Link to="/contact" className="nv-btn-outline inline-flex">
                  Discuss custom scope
                </Link>
              </div>
            </div>
          </div>

          {renderPackages('Software & Cloud')}
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="nv-cta-section py-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="nv-cta-box">
            <div className="nv-cta-glow" />
            <span className="nv-section-label">Get started</span>
            <h2>Not sure what<br />you <em>need?</em></h2>
            <p>Just tell us what's wrong. We'll figure out the rest.</p>
            <div className="nv-cta-actions">
              <Link to="/book" className="nv-btn-primary nv-btn-large">Book support →</Link>
              <Link to="/contact" className="nv-btn-ghost">Ask a question</Link>
            </div>
          </div>
        </div>
      </section>

      <RazorpayCheckoutModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
