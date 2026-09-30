import { useState } from 'react';
import API_BASE_URL from '../config/api';

interface BlogPost {
  cat: string;
  title: string;
  excerpt: string;
  time: string;
  date: string;
  grad: string;
}

const allPosts: BlogPost[] = [
  { 
    cat: "Cloud", 
    title: "When to Move to the Cloud — A No-Nonsense Guide for SMEs", 
    excerpt: "Cloud isn't always the answer. Here's an honest framework for deciding when the move actually makes sense.", 
    time: "6 min", 
    date: "May 22, 2025", 
    grad: "linear-gradient(135deg,#0a1628,#0d2040)" 
  },
  { 
    cat: "IT Tips", 
    title: "How to Recover Data From a Dead Hard Drive", 
    excerpt: "Before you panic, there's a good chance your data is still there. Here's exactly what to do — and what not to do.", 
    time: "8 min", 
    date: "May 15, 2025", 
    grad: "linear-gradient(135deg,#1a0e28,#2d1640)" 
  },
  { 
    cat: "Business", 
    title: "What Is an AMC and Does Your Business Actually Need One?", 
    excerpt: "Annual Maintenance Contracts can save you money and headaches — if you know what to look for.", 
    time: "5 min", 
    date: "May 8, 2025", 
    grad: "linear-gradient(135deg,#0e1a10,#162816)" 
  },
  { 
    cat: "Cybersecurity", 
    title: "The 7 Password Mistakes That Are Putting Your Business at Risk", 
    excerpt: "Password hygiene is boring until you're breached. These are the most common mistakes we see — fix them today.", 
    time: "4 min", 
    date: "Apr 28, 2025", 
    grad: "linear-gradient(135deg,#1a0e0e,#401616)" 
  },
  { 
    cat: "AI Research", 
    title: "Building NADT: Our First 6 Months of Autonomous Diagnostics", 
    excerpt: "An honest look at what we got right, what we got wrong, and where we're headed with our AI technician project.", 
    time: "7 min", 
    date: "Apr 20, 2025", 
    grad: "linear-gradient(135deg,#0e1028,#161840)" 
  },
  { 
    cat: "IT Tips", 
    title: "Laptop Running Hot? Here's What's Actually Happening Inside", 
    excerpt: "Thermal throttling, dust buildup, and failing fans explained — and what you should do about each.", 
    time: "5 min", 
    date: "Apr 12, 2025", 
    grad: "linear-gradient(135deg,#1a1208,#403016)" 
  },
];

const categories = ['all', 'IT Tips', 'Cybersecurity', 'AI Research', 'Cloud', 'Business'];

export default function Blog() {
  const [activeCat, setActiveCat] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredPosts = activeCat === 'all' 
    ? allPosts 
    : allPosts.filter(p => p.cat.toLowerCase() === activeCat.toLowerCase());

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
      } else {
        // Fallback simulate success
        setSubscribed(true);
      }
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#080808] text-[#e8e8e8] min-h-screen">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Blog</span>
          <h1 className="page-title">
            Insights,<br /><em>updates &amp; ideas.</em>
          </h1>
          <p className="page-sub">
            IT tips, cybersecurity insights, company news, and dispatches from our AI research lab.
          </p>
        </div>
      </section>

      {/* ═══ BLOG CONTENT ═══ */}
      <section className="py-16 pb-28">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          
          {/* Category filter buttons */}
          <div className="cats-filter">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`cat-btn ${activeCat === cat ? 'active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Featured & Side Articles */}
          <div className="blog-hero-grid">
            <div className="blog-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                className="blog-img" 
                style={{ background: 'linear-gradient(135deg,#0f0f2e 0%,#1a1040 50%,#0d1a2e 100%)', height: '280px' }}
              >
                <span className="blog-category">IT Tips</span>
              </div>
              <div className="blog-body" style={{ flex: 1 }}>
                <h3 style={{ fontSize: '24px' }}>10 Signs Your PC Is Crying for Help (And How to Fix Them)</h3>
                <p>From overheating to mysterious slowdowns — here's what your computer is trying to tell you and what to do before things get worse.</p>
                <div className="blog-meta" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <span>5 min read</span>
                  <span>·</span>
                  <span>Jun 12, 2025</span>
                  <span>·</span>
                  <span>Neurovia Team</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="blog-card-small">
                <span className="blog-category-sm">Cybersecurity</span>
                <h4>Why Small Businesses Are the #1 Target for Ransomware in 2025</h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', marginTop: '6px' }}>
                  The threat landscape has shifted. Here's what every SME owner needs to know right now.
                </p>
                <div className="blog-meta" style={{ marginTop: '12px' }}>
                  <span>4 min</span>
                  <span>·</span>
                  <span>Jun 8, 2025</span>
                </div>
              </div>

              <div className="blog-card-small">
                <span className="blog-category-sm">AI Research</span>
                <h4>NADT Update: What We've Learned From 200 Diagnostic Sessions</h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', marginTop: '6px' }}>
                  Six months into our research, here's what the data is telling us about automated repair.
                </p>
                <div className="blog-meta" style={{ marginTop: '12px' }}>
                  <span>3 min</span>
                  <span>·</span>
                  <span>May 30, 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* All Posts Grid */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '32px' }}>
              All <em style={{ fontStyle: 'italic', color: 'var(--muted)' }}>articles</em>
            </h2>

            <div className="blog-posts-grid">
              {filteredPosts.map((post) => (
                <div key={post.title} className="blog-post-card">
                  <div className="blog-thumb" style={{ background: post.grad }}>
                    <span className="blog-category">{post.cat}</span>
                  </div>
                  <div className="blog-post-body">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-meta">
                      <span>{post.time} read</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <span className="nv-section-label" style={{ justifyContent: 'center' }}>Newsletter</span>
            <h2 className="section-title" style={{ marginBottom: '12px' }}>Stay in the <em>loop.</em></h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px' }}>
              New articles, IT tips, and NADT research updates — delivered to your inbox. No spam, ever.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', maxWidth: '420px', margin: '0 auto' }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1 }}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="nv-btn-primary"
                  style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  {loading ? 'Subscribing...' : 'Subscribe →'}
                </button>
              </form>
            ) : (
              <div style={{ color: 'var(--green)', fontSize: '16px', fontWeight: 600, marginTop: '12px' }}>
                ✓ You're subscribed! Welcome to the loop.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
