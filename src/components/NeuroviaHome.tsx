import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

/* ══════════════════════════════════════
   NEUROVIA NEXUS — HOME PAGE
   Ported from neurovia.site static site
══════════════════════════════════════ */

// ─── Custom Cursor ───
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mx = -100, my = -100, fx = -100, fy = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const followCursor = () => {
      fx = lerp(fx, mx, 0.1);
      fy = lerp(fy, my, 0.1);
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      rafId = requestAnimationFrame(followCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(followCursor);

    // Hover effects
    const hoverable = document.querySelectorAll('a, button, .nv-service-card, .nv-tcard, .nv-future-card, .nv-home-team-card, .nv-founder-card');
    const addHover = () => { cursor.classList.add('hovering'); follower.classList.add('hovering'); };
    const removeHover = () => { cursor.classList.remove('hovering'); follower.classList.remove('hovering'); };
    hoverable.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover); });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      hoverable.forEach(el => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover); });
    };
  }, []);

  return (
    <>
      <div className="nv-cursor" ref={cursorRef} />
      <div className="nv-cursor-follower" ref={followerRef} />
    </>
  );
}

// ─── Hero Canvas (Floating Nodes) ───
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    const NODE_COUNT = 60;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Node {
      x: number; y: number; vx: number; vy: number; r: number; a: number;
      constructor() { this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; this.r = 0; this.a = 0; this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.5;
        this.a = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(79,127,255,${this.a})`;
        ctx!.fill();
      }
    }

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());

    const connect = (a: Node, b: Node) => {
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        const alpha = (1 - dist / 140) * 0.12;
        ctx!.strokeStyle = `rgba(79,127,255,${alpha})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }
    };

    let animId: number;
    const animate = () => {
      ctx!.clearRect(0, 0, W, H);
      nodes.forEach(n => { n.update(); n.draw(); });
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++)
          connect(nodes[i], nodes[j]);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="nv-hero-canvas" />;
}

// ─── Scroll Reveal Hook ───
function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.nv-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('nv-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Animated Counter ───
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting || animated.current) return;
        animated.current = true;
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          el.textContent = String(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = String(target);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <>
      <span className="nv-stat-num" ref={ref}>0</span>
      <span className="nv-stat-plus">{suffix}</span>
    </>
  );
}

// ─── Countdown Timer ───
function CountdownTimer() {
  const TARGET = new Date('2027-06-01T00:00:00.000Z').getTime();
  const [time, setTime] = useState({ days: '000', hours: '00', mins: '00', secs: '00' });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, TARGET - Date.now());
      const totalSecs = Math.floor(diff / 1000);
      setTime({
        days: String(Math.floor(totalSecs / 86400)).padStart(3, '0'),
        hours: String(Math.floor((totalSecs % 86400) / 3600)).padStart(2, '0'),
        mins: String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0'),
        secs: String(totalSecs % 60).padStart(2, '0'),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [TARGET]);

  return (
    <div className="nv-countdown-block nv-reveal">
      <p className="nv-countdown-label">NADT launches in</p>
      <div className="nv-countdown-timer">
        <div className="nv-cd-unit"><span>{time.days}</span><label>days</label></div>
        <div className="nv-cd-sep">:</div>
        <div className="nv-cd-unit"><span>{time.hours}</span><label>hours</label></div>
        <div className="nv-cd-sep">:</div>
        <div className="nv-cd-unit"><span>{time.mins}</span><label>min</label></div>
        <div className="nv-cd-sep">:</div>
        <div className="nv-cd-unit"><span>{time.secs}</span><label>sec</label></div>
      </div>
      <Link to="/about" className="nv-btn-ghost">Follow the journey →</Link>
    </div>
  );
}

// ─── Marquee ───
function Marquee() {
  const items = ['Remote Support', 'Virus Removal', 'Laptop Repair', 'Network Setup', 'Cybersecurity', 'Cloud Solutions', 'Software Dev', 'Data Recovery'];
  const doubled = [...items, ...items];
  return (
    <div className="nv-marquee-section">
      <div className="nv-marquee-track">
        <div className="nv-marquee-inner">
          {doubled.map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="nv-sep">✦</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN HOME PAGE COMPONENT
══════════════════════════════════════ */
export function NeuroviaHome() {
  useReveal();

  return (
    <div className="nv-home">
      <CustomCursor />

      {/* ═══ HERO ═══ */}
      <section className="nv-hero" id="nv-hero">
        <div className="nv-hero-bg">
          <HeroCanvas />
        </div>

        <div className="nv-hero-content">
          <div className="nv-hero-eyebrow nv-reveal">
            <span className="nv-dot" />
            Available for remote support today
          </div>

          <h1 className="nv-hero-title">
            <span className="nv-line nv-reveal-line">Stop settling</span>
            <span className="nv-line nv-reveal-line nv-delay-1">for broken tech.</span>
            <span className="nv-line nv-accent-stroke nv-reveal-line nv-delay-2">We fix it fast.</span>
          </h1>

          <p className="nv-hero-sub nv-reveal nv-delay-3">
            Professional IT support, software solutions, and AI innovation
            for individuals and businesses across India.
          </p>

          <div className="nv-hero-actions nv-reveal nv-delay-4">
            <Link to="/remote-help" className="nv-btn-primary">Book a technician →</Link>
            <Link to="/repair-shops" className="nv-btn-ghost">Explore services</Link>
          </div>
        </div>

        <div className="nv-hero-stats nv-reveal nv-delay-4">
          <div className="nv-stat">
            <AnimatedCounter target={20} suffix="+" />
            <span className="nv-stat-label">Devices repaired</span>
          </div>
          <div className="nv-stat-divider" />
          <div className="nv-stat">
            <AnimatedCounter target={10} suffix="+" />
            <span className="nv-stat-label">Businesses served</span>
          </div>
          <div className="nv-stat-divider" />
          <div className="nv-stat">
            <AnimatedCounter target={95} suffix="%" />
            <span className="nv-stat-label">Satisfaction rate</span>
          </div>
        </div>

        <div className="nv-scroll-hint">
          <span>scroll</span>
          <div className="nv-scroll-line" />
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      {/* ═══ SERVICES ═══ */}
      <section className="nv-services-section" id="nv-services">
        <div className="nv-container">
          <div className="nv-section-head">
            <span className="nv-section-label nv-reveal">What we do</span>
            <h2 className="nv-section-title nv-reveal">
              Every tech problem,<br /><em>one team.</em>
            </h2>
          </div>

          <div className="nv-services-grid">
            <Link to="/remote-help" className="nv-service-card nv-reveal" data-index="01">
              <div className="nv-service-icon">⚡</div>
              <h3>Remote Support</h3>
              <p>Instant online help for OS issues, software crashes, virus removal, and performance fixes.</p>
              <span className="nv-card-arrow">→</span>
            </Link>

            <Link to="/repair-shops" className="nv-service-card nv-reveal nv-delay-1" data-index="02">
              <div className="nv-service-icon">🔧</div>
              <h3>Onsite Repair</h3>
              <p>Certified technicians at your door. Hardware, networks, and office IT setup done right.</p>
              <span className="nv-card-arrow">→</span>
            </Link>

            <Link to="/repair-shops" className="nv-service-card nv-reveal nv-delay-2" data-index="03">
              <div className="nv-service-icon">🏢</div>
              <h3>Business IT</h3>
              <p>AMC contracts, managed IT, server admin, and cybersecurity for companies of all sizes.</p>
              <span className="nv-card-arrow">→</span>
            </Link>

            <Link to="/contact" className="nv-service-card nv-reveal nv-delay-3" data-index="04">
              <div className="nv-service-icon">💻</div>
              <h3>Software Development</h3>
              <p>Websites, web apps, mobile apps, AI chatbots, and workflow automation built to last.</p>
              <span className="nv-card-arrow">→</span>
            </Link>

            <Link to="/contact" className="nv-service-card nv-reveal" data-index="05">
              <div className="nv-service-icon">☁️</div>
              <h3>Cloud Solutions</h3>
              <p>Migration, infrastructure management, and scalable cloud architecture on AWS and Azure.</p>
              <span className="nv-card-arrow">→</span>
            </Link>

            <Link to="/contact" className="nv-service-card nv-reveal nv-delay-1" data-index="06">
              <div className="nv-service-icon">🛡️</div>
              <h3>Cybersecurity</h3>
              <p>Security audits, endpoint protection, compliance consulting, and incident response.</p>
              <span className="nv-card-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="nv-how-section">
        <div className="nv-container">
          <div className="nv-section-head">
            <span className="nv-section-label nv-reveal">The process</span>
            <h2 className="nv-section-title nv-reveal">Fixed in <em>five steps.</em></h2>
          </div>

          <div className="nv-steps">
            {[
              { num: '01', title: 'Book online', desc: 'Fill out our 4-step form in under 3 minutes. No calls, no waiting.' },
              { num: '02', title: 'Describe the problem', desc: 'Tell us exactly what\'s happening. Upload screenshots if needed.' },
              { num: '03', title: 'Technician assigned', desc: 'A certified expert matched to your issue is on their way within 30 min.' },
              { num: '04', title: 'Remote or onsite help', desc: 'We fix it wherever you are — at home, the office, or anywhere in between.' },
              { num: '05', title: 'Issue resolved', desc: 'Confirmed fixed, documented, and guaranteed. No fix, no fee.' },
            ].map((step, i) => (
              <div className={`nv-step nv-reveal${i > 0 ? ` nv-delay-${i}` : ''}`} key={step.num}>
                <div className="nv-step-num">{step.num}</div>
                <div className="nv-step-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="nv-how-cta nv-reveal">
            <Link to="/remote-help" className="nv-btn-primary">Start now →</Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="nv-testimonials-section" id="nv-testimonials">
        <div className="nv-container">
          <div className="nv-section-head">
            <span className="nv-section-label nv-reveal">Real clients</span>
            <h2 className="nv-section-title nv-reveal">Don't take our<br /><em>word for it.</em></h2>
          </div>

          <div className="nv-testimonials-grid">
            {[
              { stars: '★★★★', text: '"Our entire server infrastructure went down on a Friday evening. Neurovia had it back online in under two hours. Genuinely saved our weekend launch."', initials: 'RS', name: 'Rohit Sonar', role: 'IT Manager, CineFramex' },
              { stars: '★★★', text: '"I\'d been burned by freelancers before. Neurovia set up our office network properly, documented everything, and picked up every follow-up call. Rare."', initials: 'PB', name: 'Pranjal Bora', role: 'Founder, EkoTravels' },
              { stars: '★★★★', text: '"Remote session, MacBook fixed in 45 minutes. They didn\'t just patch it — they explained what went wrong and how to prevent it. Actually helpful."', initials: 'AI', name: 'Ashraful Islam', role: 'Senior Engineer, Freelancer' },
              { stars: '★★★★★', text: '"Zero downtime this entire quarter. Their managed IT service runs so smoothly I\'ve almost forgotten tech problems exist. Almost."', initials: 'JB', name: 'Jenny Baichung', role: 'Operations Head, Kubes' },
            ].map((t, i) => (
              <div className={`nv-tcard nv-reveal${i > 0 ? ` nv-delay-${i}` : ''}`} key={t.name}>
                <div className="nv-tcard-stars">{t.stars}</div>
                <p>{t.text}</p>
                <div className="nv-tcard-author">
                  <div className="nv-tcard-avatar">{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOUNDERS & TEAM ═══ */}
      <section className="nv-team-section-home" id="nv-team">
        <div className="nv-container">
          <div className="nv-section-head">
            <span className="nv-section-label nv-reveal">The people</span>
            <h2 className="nv-section-title nv-reveal">Faces behind<br /><em>every fix.</em></h2>
          </div>

          {/* Founders */}
          {[
            { initials: 'MB', badge: 'Founder & Director', name: 'Madhurjya Bordoloi', role: 'Engineer · Visionary · Builder', bio: '"I started Neurovia because I watched too many people lose hours — sometimes entire days — to tech problems that should\'ve been fixed in minutes. We\'re building the team and the technology to make that the norm, not the exception."', stats: [{ val: '2+', label: 'Years in IT' }, { val: 'BS', label: 'Education' }, { val: 'System Design', label: 'Specialization' }], linkedin: 'https://www.linkedin.com/in/madhurjya-bordoloi-computech44' },
            { initials: 'SK', badge: 'Co-Founder & Director', name: 'Subhankar Kashyap', role: 'CyberSecurity Engineer · Builder', bio: '"I co-founded this company after seeing too many teams spend their time recovering from preventable security incidents instead of building what matters. We\'re creating the technology and the expertise to make cybersecurity proactive, not reactive."', stats: [{ val: '2+', label: 'Years in IT' }, { val: 'BCA', label: 'Education' }, { val: 'CyberSecurity', label: 'Specialization' }] },
            { initials: 'HG', badge: 'Co-Founder & Director', name: 'Himanta Goswami', role: 'Marketing · Industry Research', bio: '"As a market researcher, I spent years uncovering patterns in customer behavior and market gaps. Those insights eventually led me to co-found this company. Our goal is simple: turn research into action."', stats: [{ val: '2+', label: 'Years in Market Research' }, { val: 'BBA', label: 'Education' }, { val: 'Market Research', label: 'Specialization' }], linkedin: 'https://www.linkedin.com/in/himanta-goswami-4004aa345' },
            { initials: 'KS', badge: 'Co-Founder & VP of Engineering', name: 'Kunal Singha', role: 'Software Engineer · Web Developer', bio: '"I co-founded this company after spending years turning complex problems into simple, reliable software. We\'re building products that people enjoy using and engineering systems that businesses can depend on."', stats: [{ val: '3+', label: 'Years in IT' }, { val: 'BCA', label: 'Education' }, { val: 'Web Development', label: 'Specialization' }], linkedin: 'https://www.linkedin.com/in/kunal-singha-9b74b234a/' },
          ].map((f) => (
            <div className="nv-founder-card nv-reveal" key={f.initials}>
              <div className="nv-founder-photo">
                <div className="nv-founder-initials">{f.initials}</div>
                <div className="nv-founder-glow-ring" />
              </div>
              <div className="nv-founder-content">
                <div className="nv-founder-badge">{f.badge}</div>
                <h3 className="nv-founder-name">{f.name}</h3>
                <p className="nv-founder-role">{f.role}</p>
                <p className="nv-founder-bio">{f.bio}</p>
                <div className="nv-founder-stats">
                  {f.stats.map(s => (
                    <div className="nv-fstat" key={s.label}>
                      <span>{s.val}</span>
                      <label>{s.label}</label>
                    </div>
                  ))}
                </div>
                {f.linkedin && (
                  <div className="nv-founder-links">
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="nv-founder-link">LinkedIn →</a>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Team grid */}
          <div className="nv-team-label nv-reveal">
            <span>Meet the full team</span>
          </div>

          <div className="nv-home-team-grid">
            {[
              { initials: 'MD', name: 'Manos Jyoti Deka', role: 'Founder Associate', edu: 'B.Tech', spec: 'AI/ML', gradient: 'linear-gradient(135deg,#1e3a1e,#2d5a2d)' },
              { initials: 'MH', name: 'Mehtab Hoque', role: 'Chief Product Officer', edu: 'B.Tech', spec: 'AI', gradient: 'linear-gradient(135deg,#3a1e2e,#5a2d4e)' },
              { initials: 'PK', name: 'Prantik Kalita', role: 'Chief AI Architect', edu: 'B.Tech', spec: 'AI/ML', gradient: 'linear-gradient(135deg,#2e2a1e,#4e462e)' },
              { initials: 'HD', name: 'Himangshu Kumar Deka', role: 'Chief System Architect', edu: 'B.Tech', spec: 'SWE', gradient: 'linear-gradient(135deg,#1e2e3a,#2d4e5a)' },
            ].map((m, i) => (
              <div className={`nv-home-team-card nv-reveal${i > 0 ? ` nv-delay-${i}` : ''}`} key={m.initials}>
                <div className="nv-htc-top">
                  <div className="nv-htc-avatar" style={{ background: m.gradient }}>{m.initials}</div>
                </div>
                <h4>{m.name}</h4>
                <span>{m.role}</span>
                <div className="nv-htc-meta">
                  <div className="nv-htc-stat"><strong>{m.edu}</strong><small>Education</small></div>
                  <div className="nv-htc-stat"><strong>{m.spec}</strong><small>Specialization</small></div>
                </div>
              </div>
            ))}
          </div>

          <div className="nv-team-cta nv-reveal">
            <Link to="/about" className="nv-btn-outline">See full team profiles →</Link>
          </div>
        </div>
      </section>

      {/* ═══ VIDEO SECTION ═══ */}
      <section className="nv-video-section" id="nv-videos">
        <div className="nv-container">
          <div className="nv-section-head">
            <span className="nv-section-label nv-reveal">Video library</span>
            <h2 className="nv-section-title nv-reveal">Watch us<br /><em>fix it live.</em></h2>
            <p className="nv-reveal" style={{ color: 'var(--nv-muted)', fontSize: '17px', maxWidth: '480px', marginTop: '12px' }}>
              Real repair sessions, tutorials, and behind-the-scenes looks at how we work.
            </p>
          </div>

          <div className="nv-video-embed">
            <iframe
              src="https://www.youtube.com/embed/pFTidwuIAvI?rel=0"
              allowFullScreen
              allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"
              referrerPolicy="strict-origin"
              title="Neurovia Video"
            />
          </div>
          <div className="nv-vf-info">
            <h3>Honest Feedback From a Partner Technician</h3>
            <div className="nv-vf-meta-row">
              <div className="nv-vf-stars">★★★★</div>
              <span style={{ color: 'var(--nv-white)', fontWeight: 700, fontSize: '14px' }}>4.2</span>
              <span style={{ color: 'var(--nv-muted)', fontSize: '13px' }}>(1.1k views)</span>
              <span style={{ color: 'var(--nv-dim)' }}>·</span>
              <span style={{ color: 'var(--nv-muted)', fontSize: '13px' }}>Dec 2025</span>
            </div>
            <div className="nv-vf-actions">
              <button className="nv-btn-primary" onClick={() => window.open('https://www.youtube.com/@Computechsolutions-ks6hg')}>▶ Youtube</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FUTURE / WISHLIST ═══ */}
      <section className="nv-future-section">
        <div className="nv-container">
          <div className="nv-section-head">
            <span className="nv-section-label nv-reveal">What's coming</span>
            <h2 className="nv-section-title nv-reveal">We're building<br /><em>what's next.</em></h2>
          </div>

          <div className="nv-future-grid">
            {[
              { status: 'In Development', title: 'NADT — Autonomous Device Technician', desc: 'An AI system that diagnoses and fixes common device issues without human intervention. Our biggest bet.' },
              { status: 'In Development', title: 'Smart Ticket Routing', desc: 'AI that matches your issue to the best available technician in seconds, not hours.' },
              { status: 'Planning', title: 'Mobile App', desc: 'Book, track, and communicate with your technician from your phone in real time.' },
              { status: 'Research', title: 'Remote Monitoring Dashboard', desc: '24/7 proactive monitoring for businesses, with automatic alerts before problems hit.' },
            ].map((f, i) => (
              <div className={`nv-future-card nv-reveal${i > 0 ? ` nv-delay-${i}` : ''}`} data-status={f.status} key={f.title}>
                <div className="nv-future-status">{f.status}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <CountdownTimer />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="nv-cta-section">
        <div className="nv-container">
          <div className="nv-cta-box nv-reveal">
            <div className="nv-cta-glow" />
            <span className="nv-section-label">Ready?</span>
            <h2>Your tech problem<br />ends <em>today.</em></h2>
            <p>Book a certified technician in minutes. Remote or onsite. No fix, no fee.</p>
            <div className="nv-cta-actions">
              <Link to="/remote-help" className="nv-btn-primary nv-btn-large">Book support →</Link>
              <Link to="/contact" className="nv-btn-ghost">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
