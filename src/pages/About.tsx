import { useState } from 'react';
import { Link } from 'react-router-dom';

interface TeamPerson {
  initials: string;
  name: string;
  role: string;
  badge?: string;
  photo?: string;
  linkedin?: string;
  bg: string;
}

function AvatarWithFallback({ person, size = 72 }: { person: TeamPerson; size?: number }) {
  const [imgErr, setImgErr] = useState(false);

  if (person.photo && !imgErr) {
    return (
      <img
        src={person.photo}
        alt={person.name}
        onError={() => setImgErr(true)}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border border-white/20 mx-auto mb-3"
      />
    );
  }

  return (
    <div
      className="team-avatar"
      style={{
        width: size,
        height: size,
        background: person.bg,
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      {person.initials}
    </div>
  );
}

export function About() {
  const values = [
    {
      icon: '⚡',
      title: 'Speed without sacrifice',
      description:
        "Fast response doesn't mean rushed work. We respond quickly because your time matters, and we fix properly because your device matters.",
    },
    {
      icon: '🔍',
      title: 'Radical transparency',
      description:
        "No hidden fees. No vague diagnoses. We explain exactly what's wrong, what we're doing, and what it will cost — before we start.",
    },
    {
      icon: '🛡️',
      title: 'Trust, earned',
      description:
        'Every technician is verified and background-checked. We access your devices only with your explicit permission and document everything.',
    },
    {
      icon: '🚀',
      title: 'Always improving',
      description:
        "We're building NADT because we genuinely believe AI can make support faster and smarter. We invest in the future while delivering today.",
    },
  ];

  const founders: TeamPerson[] = [
    {
      initials: 'MB',
      name: 'Madhurjya Bordoloi',
      role: 'Founder & Director · System Design',
      badge: 'Founder',
      photo: '/images/founders/madhurjya.jpg',
      linkedin: 'https://www.linkedin.com/in/madhurjya-bordoloi-computech44',
      bg: 'linear-gradient(135deg,#1a1a3e,#2d2d70)',
    },
    {
      initials: 'SK',
      name: 'Subhankar Kashyap',
      role: 'Co-Founder & Director · CyberSecurity',
      badge: 'Co-Founder',
      photo: '/images/founders/subhankar.jpg',
      bg: 'linear-gradient(135deg,#1a2e3e,#2d4a60)',
    },
    {
      initials: 'HG',
      name: 'Himanta Goswami',
      role: 'Co-Founder & Director · Marketing & Research',
      badge: 'Co-Founder',
      photo: '/images/founders/himanta.jpg',
      linkedin: 'https://www.linkedin.com/in/himanta-goswami-4004aa345',
      bg: 'linear-gradient(135deg,#1a1a3e,#2d2d60)',
    },
    {
      initials: 'KS',
      name: 'Kunal Singha',
      role: 'Co-Founder & VP of Engineering',
      badge: 'Co-Founder',
      photo: '/images/founders/kunal.jpg',
      linkedin: 'https://www.linkedin.com/in/kunal-singha-9b74b234a/',
      bg: 'linear-gradient(135deg,#1e3a2e,#2d5a3d)',
    },
  ];

  const teamMembers: TeamPerson[] = [
    {
      initials: 'MD',
      name: 'Manos Jyoti Deka',
      role: 'Founder Associate · AI/ML',
      photo: '/images/members/manos.jpg',
      linkedin: 'https://www.linkedin.com/in/manos-jyoti-deka-534b96305',
      bg: 'linear-gradient(135deg,#1e3a1e,#2d5a2d)',
    },
    {
      initials: 'MH',
      name: 'Mehtab Hoque',
      role: 'Chief Product Officer',
      bg: 'linear-gradient(135deg,#3a1e2e,#5a2d4e)',
    },
    {
      initials: 'PK',
      name: 'Prantik Kalita',
      role: 'Chief AI Architect',
      bg: 'linear-gradient(135deg,#2e2a1e,#4e462e)',
    },
    {
      initials: 'HD',
      name: 'Himangshu Kumar Deka',
      role: 'Chief System Architect',
      bg: 'linear-gradient(135deg,#1e2e3a,#2d4e5a)',
    },
    {
      initials: 'JS',
      name: 'Junaid Shehrie',
      role: 'Core Engineering Member',
      photo: '/images/members/junaid.jpg',
      linkedin: 'https://www.linkedin.com/in/junaid-shehrie-8a590928b',
      bg: 'linear-gradient(135deg,#1e2a3a,#2d3e5a)',
    },
    {
      initials: 'FH',
      name: 'Forzina Hoque',
      role: 'Social Media Management',
      bg: 'linear-gradient(135deg,#2e1e3a,#4e2d5a)',
    },
    {
      initials: 'YB',
      name: 'Yuvraj Basistha',
      role: 'Business Development Associate',
      bg: 'linear-gradient(135deg,#1e3a1e,#2d5a2d)',
    },
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
                Today, we serve individuals, startups, and enterprises across Assam and beyond, with a team of certified engineers and technicians who care as much about your time as their craft.
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

      {/* ═══ FOUNDERS & FULL TEAM ═══ */}
      <section className="team-section">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Leadership &amp; Engineering</span>
          <h2 className="nv-section-title">
            The people <em>behind every fix.</em>
          </h2>

          {/* Founders Row */}
          <h3 className="font-['Syne'] text-lg font-bold text-white mt-12 mb-5">
            Founding Directors
          </h3>
          <div className="team-grid mb-14">
            {founders.map((f) => (
              <div key={f.name} className="team-card flex flex-col items-center text-center">
                <AvatarWithFallback person={f} size={84} />
                {f.badge && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#4f7fff]/15 border border-[#4f7fff]/30 text-[#8bb4ff] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {f.badge}
                  </span>
                )}
                <h4>{f.name}</h4>
                <span className="mb-2">{f.role}</span>
                {f.linkedin && (
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#888888] hover:text-white mt-auto pt-2 transition-colors"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Core Team Grid */}
          <h3 className="font-['Syne'] text-lg font-bold text-white mb-5">
            Core Team &amp; Associates
          </h3>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="team-card flex flex-col items-center text-center">
                <AvatarWithFallback person={member} size={72} />
                <h4>{member.name}</h4>
                <span className="mb-2">{member.role}</span>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#888888] hover:text-white mt-auto pt-2 transition-colors"
                  >
                    LinkedIn →
                  </a>
                )}
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
              <Link to="/services" className="btn-primary btn-large">
                Explore Services &amp; Pricing →
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
