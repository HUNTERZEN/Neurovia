import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="bg-[#080808] text-[#e8e8e8] min-h-screen">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Our Services</span>
          <h1 className="page-title">
            Every tech problem,<br /><em>one team.</em>
          </h1>
          <p className="page-sub">
            Remote or onsite, personal or enterprise — we cover the full spectrum of IT support and technology services.
          </p>
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
              <Link to="/book" className="nv-btn-primary inline-flex mt-6">Book now →</Link>
            </div>
            <div className="svc-right">
              <div className="svc-list">
                <div className="svc-item"><span>→</span> OS Troubleshooting (Windows, macOS, Linux)</div>
                <div className="svc-item"><span>→</span> Virus & Malware Removal</div>
                <div className="svc-item"><span>→</span> Software Installation & Configuration</div>
                <div className="svc-item"><span>→</span> Driver Updates</div>
                <div className="svc-item"><span>→</span> Email Setup (Outlook, Gmail, Business)</div>
                <div className="svc-item"><span>→</span> Performance Optimization</div>
                <div className="svc-item"><span>→</span> Remote Diagnostics</div>
                <div className="svc-item"><span>→</span> Printer Configuration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-[1160px] mx-auto" />

      {/* ═══ 02 ONSITE REPAIR ═══ */}
      <section className="service-detail">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="service-detail-grid reverse">
            <div className="svc-right">
              <div className="svc-list">
                <div className="svc-item"><span>→</span> Desktop & Laptop Repair</div>
                <div className="svc-item"><span>→</span> Hardware Replacement (RAM, SSD, Battery)</div>
                <div className="svc-item"><span>→</span> Network Installation & WiFi Setup</div>
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
              <Link to="/book" className="nv-btn-primary inline-flex mt-6">Schedule visit →</Link>
            </div>
          </div>
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
              <Link to="/contact" className="nv-btn-primary inline-flex mt-6">Get a quote →</Link>
            </div>
            <div className="svc-right">
              <div className="svc-list">
                <div className="svc-item"><span>→</span> Annual Maintenance Contracts (AMC)</div>
                <div className="svc-item"><span>→</span> Managed IT Services</div>
                <div className="svc-item"><span>→</span> Server Administration</div>
                <div className="svc-item"><span>→</span> Backup & Disaster Recovery</div>
                <div className="svc-item"><span>→</span> Employee IT Support</div>
                <div className="svc-item"><span>→</span> Infrastructure Management</div>
                <div className="svc-item"><span>→</span> Cybersecurity Audits</div>
              </div>
            </div>
          </div>
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
                <div className="svc-item"><span>→</span> Web & Mobile Applications</div>
                <div className="svc-item"><span>→</span> AI Chatbots & Automation</div>
                <div className="svc-item"><span>→</span> Cloud Migration (AWS, Azure, GCP)</div>
                <div className="svc-item"><span>→</span> Cloud Architecture Design</div>
                <div className="svc-item"><span>→</span> DevOps & CI/CD</div>
              </div>
            </div>
            <div className="svc-left">
              <span className="svc-num">04</span>
              <h2>Software & <em>Cloud</em></h2>
              <p>We build products and infrastructure that scale. From a landing page to a full SaaS platform — scoped to your exact needs.</p>
              <Link to="/contact" className="nv-btn-primary inline-flex mt-6">Discuss project →</Link>
            </div>
          </div>
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
    </div>
  );
}
