import React from 'react';
import { Link } from 'react-router-dom';

export function About() {
  const values = [
    {
      icon: "⚡",
      title: "Speed without sacrifice",
      description: "Fast response doesn't mean rushed work. We respond quickly because your time matters, and we fix properly because your device matters."
    },
    {
      icon: "🔍",
      title: "Radical transparency",
      description: "No hidden fees. No vague diagnoses. We explain exactly what's wrong, what we're doing, and what it will cost — before we start."
    },
    {
      icon: "🛡️",
      title: "Trust, earned",
      description: "Every technician is verified and background-checked. We access your devices only with your explicit permission and document everything."
    },
    {
      icon: "🚀",
      title: "Always improving",
      description: "We're building NADT because we genuinely believe AI can make support faster and smarter. We invest in the future while delivering today."
    }
  ];

  const teamMembers = [
    {
      initials: "HG",
      name: "Himanta Goswami",
      role: "Co-Founder & VP of Marketing",
      bg: "linear-gradient(135deg,#1a1a3e,#2d2d60)"
    },
    {
      initials: "KS",
      name: "Kunal Singha",
      role: "Co-Founder & VP of Engineering",
      bg: "linear-gradient(135deg,#1e3a2e,#2d5a3d)"
    },
    {
      initials: "MD",
      name: "Manos Jyoti Deka",
      role: "Founder Associate · AI/ML",
      bg: "linear-gradient(135deg,#1e3a1e,#2d5a2d)"
    },
    {
      initials: "MH",
      name: "Mehtab Hoque",
      role: "Chief Product Officer",
      bg: "linear-gradient(135deg,#3a1e2e,#5a2d4e)"
    },
    {
      initials: "PK",
      name: "Prantik Kalita",
      role: "Chief AI Architect",
      bg: "linear-gradient(135deg,#2e2a1e,#4e462e)"
    },
    {
      initials: "HD",
      name: "Himangshu Kumar Deka",
      role: "Chief System Architect",
      bg: "linear-gradient(135deg,#1e2e3a,#2d4e5a)"
    },
    {
      initials: "FH",
      name: "Forzina Hoque",
      role: "Social Media Management",
      bg: "linear-gradient(135deg,#2e1e3a,#4e2d5a)"
    },
    {
      initials: "YB",
      name: "Yuvraj Basistha",
      role: "Business Development Associate",
      bg: "linear-gradient(135deg,#1e3a1e,#2d5a2d)"
    }
  ];

  return (
    <div className="bg-[#080808] text-[#e8e8e8] min-h-screen">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">About us</span>
          <h1 className="page-title">
            Built to make tech<br /><em>work for you.</em>
          </h1>
          <p className="page-sub">
            We started Neurovia Nexus because we were tired of watching people lose hours to broken technology and unreliable support.
          </p>
        </div>
      </section>

      {/* ═══ STORY & BIG STATS ═══ */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="about-grid">
            <div className="about-left">
              <span className="nv-section-label">Our story</span>
              <h2>
                We're not just fixing<br /><em>computers.</em>
              </h2>
              <p>
                Neurovia Nexus was founded in Assam in 2025 with one belief: technology should work for you, not against you. Every customer deserves fast, honest, transparent support — not vague timelines and unclear pricing.
              </p>
              <p>
                We started with remote support, quickly expanded to onsite services, and are now building NADT — our AI-powered autonomous device technician — to be the future of IT support in India.
              </p>
              <p>
                Today, we serve individuals, startups, and enterprises across Assam and beyond, with a team of certified technicians who care as much about your time as their craft.
              </p>
            </div>

            <div className="about-right">
              <div className="stats-block">
                <div className="big-stat">
                  <span className="stat-num">20</span>
                  <span className="stat-plus">+</span>
                  <p>devices fixed since launch</p>
                </div>
                <div className="big-stat mt-10 pt-10 border-t border-white/[0.08]">
                  <span className="stat-num">10</span>
                  <span className="stat-plus">+</span>
                  <p>businesses trust us with their IT</p>
                </div>
                <div className="big-stat mt-10 pt-10 border-t border-white/[0.08]">
                  <span className="stat-num">95</span>
                  <span className="stat-plus">%</span>
                  <p>customer satisfaction rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CORE VALUES ═══ */}
      <section className="about-values">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Core values</span>
          <h2 className="nv-section-title">
            What we <em>stand for.</em>
          </h2>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE TEAM ═══ */}
      <section className="team-section">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">The team</span>
          <h2 className="nv-section-title">
            The people <em>behind every fix.</em>
          </h2>

          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div key={i} className="team-card">
                <div
                  className="team-avatar"
                  style={{ background: member.bg, border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {member.initials}
                </div>
                <h4>{member.name}</h4>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-24 border-t border-white/[0.08]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="nv-cta-box text-center">
            <span className="nv-section-label">Get started</span>
            <h2 className="font-['Syne'] text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Your tech problem<br />ends <em className="italic text-[#888888]">today.</em>
            </h2>
            <p className="text-[#888888] text-base sm:text-lg max-w-xl mx-auto mb-8">
              Book a certified technician in minutes. Remote or onsite. No fix, no fee.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/remote-help" className="btn-primary btn-large">
                Book support →
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;