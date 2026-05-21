import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Section = ({ id, style, children }) => (
  <section id={id} style={{
    padding: '100px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    ...style
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
  </section>
)

const Split = ({ children, reverse }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'center',
    direction: reverse ? 'rtl' : 'ltr'
  }}>
    <style>{`@media (max-width: 767px) { .split-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    <div className="split-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center',
      direction: reverse ? 'rtl' : 'ltr',
      width: '100%'
    }}>
      {children}
    </div>
  </div>
)

const SplitContent = ({ children }) => (
  <div style={{ direction: 'ltr' }}>{children}</div>
)

const SplitMedia = ({ children }) => (
  <div style={{ direction: 'ltr', display: 'flex', justifyContent: 'center' }}>{children}</div>
)

const testimonials = [
  {
    name: 'Sarah Johnson', role: 'Swimming Club Manager',
    title: 'Elite Swimming Academy',
    text: 'CloudSport transformed how we manage our facility. Bookings increased 45% and we save 10 hours per week on administration.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Marcus Chen', role: 'Professional Athlete',
    title: 'National Tennis Association',
    text: 'Finally, a platform that understands athletes. Easy to find training slots, connect with coaches, and track my progress all in one place.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Emma Rodriguez', role: 'Football Club Owner',
    title: 'Downtown Football Complex',
    text: "We've been able to streamline our entire booking system and provide better service to our members. Highly recommend!",
    rating: 5,
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'David Williams', role: 'Facility Manager',
    title: 'Metropolitan Sports Center',
    text: 'The real-time analytics help us make better decisions. Our facility utilization went up 30% in just 3 months.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face'
  }
]

const stats = [
  { value: '1,500+', label: 'Active Athletes' },
  { value: '50+', label: 'Partner Clubs' },
  { value: '5,000+', label: 'Monthly Bookings' },
  { value: '45%', label: 'Efficiency Gain' }
]

const faqs = [
  { q: 'How does team billing work?', a: 'Team billing is handled through the club leader dashboard. You can set up monthly or per-session billing, track payments, and generate invoices automatically.' },
  { q: 'Can I integrate existing hardware access gates?', a: 'Yes, CloudSport supports integration with most major access control systems. Our API allows seamless connection with RFID, QR code, and biometric systems.' },
  { q: 'How do athletes handle cancellations?', a: 'Athletes can cancel bookings directly from their dashboard up to 24 hours before a session. Refunds are processed automatically according to your facility policy.' },
  { q: 'What payment methods are supported?', a: 'We support all major credit cards, PayPal, and bank transfers. Payments are processed securely through our PCI-compliant payment gateway.' }
]

const featuredClubs = [
  { name: 'Elite Swimming Academy', img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop', location: 'Downtown', members: 340 },
  { name: 'City Tennis Complex', img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', location: 'Westside', members: 280 },
  { name: 'Metro Football Stadium', img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop', location: 'Eastside', members: 520 },
  { name: 'Elite Badminton Hall', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop', location: 'Northside', members: 190 }
]

const heroAnimStyles = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes pulseArrow {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(8px); }
}
.hero-bg {
  background: linear-gradient(-45deg, #0a1929, #0a0a0f, #0d2137, #0a1929);
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
}
.scroll-indicator {
  animation: pulseArrow 2s ease-in-out infinite;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(36px); }
  to { opacity: 1; transform: translateY(0); }
}
.process-card {
  animation: fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.25, 1) forwards;
  opacity: 0;
}
.process-card:nth-child(1) { animation-delay: 0.05s; }
.process-card:nth-child(2) { animation-delay: 0.15s; }
.process-card:nth-child(3) { animation-delay: 0.25s; }
.process-card:nth-child(4) { animation-delay: 0.35s; }
.process-card:hover .step-glow {
  transform: scale(1.12);
  box-shadow: 0 0 24px rgba(0,212,255,0.35);
}

.testimonial-card {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.25, 1);
}
.testimonial-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0,212,255,0.15);
}

.stat-box {
  transition: all 0.3s ease;
}
.stat-box:hover {
  transform: translateY(-4px);
}

.club-feature-card {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.25, 1);
  cursor: pointer;
}
.club-feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0,212,255,0.2);
}

@media (max-width: 767px) {
  .split-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .testimonial-grid { grid-template-columns: 1fr !important; }
  .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
  .featured-grid { grid-template-columns: 1fr !important; }
  .split-layout { grid-template-columns: 1fr !important; }
  .faq-grid { grid-template-columns: 1fr !important; }
  .pricing-grid { grid-template-columns: 1fr !important; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .split-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
  .testimonial-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .faq-grid { grid-template-columns: 1fr !important; }
}
`

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <style>{heroAnimStyles}</style>

      {/* ===== HERO ===== */}
      <section className="hero-bg" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 600px 400px at 20% 30%, rgba(0,212,255,0.08) 0%, transparent 100%),
            radial-gradient(ellipse 500px 300px at 80% 70%, rgba(0,212,255,0.05) 0%, transparent 100%)
          `,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 820 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <img src="/logo.png" alt="CloudSport" style={{ height: 48 }} onError={e => { e.target.style.display = 'none' }} loading="eager" />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 3 }}>CloudSport Features</span>
          </div>
          <h1 className="hero-title" style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 24
          }}>
            Manage the Complex.<br />
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #60efff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Elevate the Game.</span>
          </h1>
          <p className="hero-subtitle" style={{
            fontSize: 18,
            color: '#b0b9c3',
            maxWidth: 620,
            margin: '0 auto 40px',
            lineHeight: 1.7
          }}>
            The all-in-one platform connecting athletes, club leaders, and facility managers. 
            Streamline bookings, organize teams, and track performance in real-time.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register?role=athlete" className="btn btn-outline btn-lg pill" style={{ textDecoration: 'none', minWidth: 180, justifyContent: 'center' }}>
              Athlete Portal
            </Link>
            <Link to="/register?role=manager" className="btn btn-primary btn-lg pill" style={{ textDecoration: 'none', minWidth: 180, justifyContent: 'center' }}>
              Manager Dashboard
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--accent)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4
        }} onClick={() => scrollTo('how-it-works')}>
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{
        padding: '48px 24px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
            textAlign: 'center'
          }}>
            {stats.map((s, i) => (
              <div key={i} className="stat-box" style={{ padding: '16px 8px' }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--accent)', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <Section id="how-it-works" style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'rgba(0,212,255,0.05)',
          filter: 'blur(120px)',
          pointerEvents: 'none'
        }} />

        <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
          <span className="section-tag">Process</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Seamless Operations — Step by Step</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From booking to play, CloudSport connects every part of the sports ecosystem.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          position: 'relative',
          zIndex: 1
        }}>
          {[
            { step: 1, title: 'Browse & Book', desc: 'Athletes instantly find and reserve available courts or fields.' },
            { step: 2, title: 'Organize Teams', desc: 'Club leaders schedule practices and manage team rosters.' },
            { step: 3, title: 'Monitor Operations', desc: 'Facility managers track utilization and revenue in real-time.' },
            { step: 4, title: 'Play & Track', desc: 'Show up, scan in, and focus on the game.' }
          ].map(s => (
            <div key={s.step} className="process-card" style={{
              padding: 32,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.25, 1)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'
              e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(0,212,255,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div className="step-glow" style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, transparent 80%)',
                border: '1px solid rgba(0,212,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--accent)',
                margin: '0 auto 20px',
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.25, 1), box-shadow 0.35s ease'
              }}>{s.step}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FEATURED CLUBS ===== */}
      <Section id="clubs" style={{ background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-tag">Featured Clubs</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Trusted by Leading Sports Clubs</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Join 50+ clubs using CloudSport to manage their facilities and grow their community.
          </p>
        </div>

        <div className="featured-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24
        }}>
          {featuredClubs.map((club, i) => (
            <div key={i} className="club-feature-card" style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <img src={club.img} alt={club.name} style={{
                width: '100%',
                height: 220,
                objectFit: 'cover',
                display: 'block'
              }} loading="lazy" />
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{club.name}</h3>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>{club.location} · {club.members} members</div>
                <Link to="/clubs" className="btn btn-outline btn-sm pill" style={{ textDecoration: 'none' }}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FOR ATHLETES ===== */}
      <Section id="for-athletes" style={{ background: 'var(--bg-primary)' }}>
        <div className="split-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center'
        }}>
          <div>
            <span className="section-tag">Athletes</span>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Built for Athletes, by Athletes</h2>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
              Everything you need to find, book, and play your favorite sports. No more phone calls or spreadsheets.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Instant Facility Booking',
                'Digital Access Passes',
                'Match & Stat Tracking',
                'Team Communication',
                'Flexible Scheduling'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0
                  }}>✓</div>
                  <span style={{ color: 'var(--text-primary)', fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/register?role=athlete" className="btn btn-primary pill" style={{ marginTop: 32, textDecoration: 'none' }}>
              Create Player Profile
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=500&h=600&fit=crop" alt="Athlete using app"
              style={{
                width: '100%',
                maxWidth: 420,
                borderRadius: 20,
                objectFit: 'cover',
                aspectRatio: '5/6',
                border: '1px solid rgba(255,255,255,0.06)'
              }} loading="lazy" />
          </div>
        </div>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      <Section id="testimonials" style={{ background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>What Our Users Say</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Join thousands of athletes and managers using CloudSport.
          </p>
        </div>

        <div className="testimonial-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 28
            }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} style={{ color: '#f59e0b', fontSize: 16 }}>★</span>
                ))}
              </div>
              <div style={{ fontSize: 36, color: 'var(--accent)', opacity: 0.3, lineHeight: 0.5, marginBottom: 8 }}>"</div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                {t.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={t.img} alt={t.name} style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent)',
                  flexShrink: 0
                }} loading="lazy" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role} · {t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FOR MANAGERS ===== */}
      <Section id="for-managers" style={{ background: 'var(--bg-primary)' }}>
        <div className="split-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" alt="Manager dashboard"
              style={{
                width: '100%',
                maxWidth: 480,
                borderRadius: 16,
                objectFit: 'cover',
                aspectRatio: '4/3',
                border: '1px solid rgba(255,255,255,0.06)'
              }} loading="lazy" />
          </div>

          <div>
            <span className="section-tag">Management</span>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Complete Control for Facility Managers</h2>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
              From automated scheduling to real-time revenue tracking, CloudSport gives you the tools to run your facility like a pro.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Automated Court Allocation',
                'Revenue Dashboards',
                'Dynamic Pricing Tools',
                'Staff Scheduling',
                'Maintenance Tracking'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#34d399',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0
                  }}>✓</div>
                  <span style={{ color: 'var(--text-primary)', fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/register?role=manager" className="btn btn-primary pill" style={{ marginTop: 32, textDecoration: 'none' }}>
              Register a Facility
            </Link>
          </div>
        </div>
      </Section>

      {/* ===== SPORTS SECTION ===== */}
      <Section id="sports" style={{ background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-tag">Sports</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Everything You Need to Know</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From swimming to badminton, we support all major sports.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16
        }}>
          {[
            { name: 'Swimming', color: '#0ea5e9', img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop', desc: 'Pool management, lane scheduling, swim meet tracking' },
            { name: 'Tennis', color: '#84cc16', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=250&fit=crop', desc: 'Court booking, tournament brackets, coaching tools' },
            { name: 'Football', color: '#22c55e', img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=250&fit=crop', desc: 'Field allocation, team management, match scheduling' },
            { name: 'Basketball', color: '#f97316', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop', desc: 'Court time booking, league management, stats tracking' },
            { name: 'Volleyball', color: '#ef4444', img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=400&h=250&fit=crop', desc: 'Net reservations, team rosters, tournament organization' },
            { name: 'Badminton', color: '#a855f7', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop', desc: 'Court booking, shuttlecock tracking, ladder rankings' }
          ].map((sport, i) => (
            <div key={i} style={{
              borderRadius: 12,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.25, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,212,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <img src={sport.img} alt={sport.name} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} loading="lazy" />
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="12" fill={sport.color} opacity="0.2"/>
                    <g transform="translate(4, 4) scale(0.67)">
                      <circle cx="12" cy="12" r="8" fill="none" stroke={sport.color} strokeWidth="1.5"/>
                      {sport.name === 'Swimming' && <path d="M4 16l3-4 3 4 3-4 3 4 3-4" fill="none" stroke={sport.color} strokeWidth="1.5" strokeLinecap="round"/>}
                      {sport.name === 'Tennis' && <><line x1="12" y1="4" x2="12" y2="20" stroke={sport.color} strokeWidth="1.5"/><line x1="4" y1="12" x2="20" y2="12" stroke={sport.color} strokeWidth="1.5"/></>}
                      {sport.name === 'Football' && <><path d="M12 4L8 12l4 8 4-8z" fill="none" stroke={sport.color} strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke={sport.color} strokeWidth="1.5"/></>}
                      {sport.name === 'Basketball' && <><line x1="12" y1="4" x2="12" y2="20" stroke={sport.color} strokeWidth="1.5"/><path d="M4 8h16M4 16h16" fill="none" stroke={sport.color} strokeWidth="1.5"/></>}
                      {sport.name === 'Volleyball' && <><path d="M6 6c2 4 2 8 0 12M18 6c-2 4-2 8 0 12M6 18c4-2 8-2 12 0M6 6c4 2 8 2 12 0" fill="none" stroke={sport.color} strokeWidth="1.5"/></>}
                      {sport.name === 'Badminton' && <><ellipse cx="12" cy="8" rx="3" ry="6" fill="none" stroke={sport.color} strokeWidth="1.5"/><circle cx="12" cy="6" r="2" fill={sport.color}/><path d="M12 14l-5 6M12 14l5 6" fill="none" stroke={sport.color} strokeWidth="1.5" strokeLinecap="round"/></>}
                    </g>
                  </svg>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{sport.name}</h3>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{sport.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== PRICING ===== */}
      <Section id="pricing" style={{ background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-tag">Pricing</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Scalable Solutions for Any Complex</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Start free and upgrade as you grow.
          </p>
        </div>

        <div className="pricing-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          maxWidth: 800,
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 40,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 16 }}>Basic Player</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Free</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>For individual athletes</p>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {['Book facilities', 'Join teams', 'Track stats', 'Basic schedule'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link to="/register?role=athlete" className="btn btn-outline pill" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>

          <div style={{
            padding: 40,
            textAlign: 'center',
            border: '2px solid var(--accent)',
            borderRadius: 16,
            position: 'relative',
            background: 'rgba(0,212,255,0.03)'
          }}>
            <div style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--accent)',
              color: '#0a0a0f',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 2,
              padding: '4px 16px',
              borderRadius: 999
            }}>Popular</div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 16 }}>Club Leader & Manager</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: '#fff' }}>$49</span>
              <span style={{ fontSize: 16, color: 'var(--text-secondary)' }}>/month</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>For clubs and facilities</p>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {['Bulk bookings', 'Financial reporting', 'Member management', 'Staff scheduling', 'Revenue analytics'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link to="/register?role=manager" className="btn btn-primary pill" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </Section>

      {/* ===== NEWS SECTION ===== */}
      <Section id="news-section" style={{ background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-tag">News</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Latest from CloudSport</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Stay updated with platform news, tips, and community stories.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24
        }}>
          {[
            { title: 'New Feature: Real-time Availability Heatmaps', date: 'Mar 15, 2026', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', tag: 'Product Update' },
            { title: 'Elite Swimming Academy Reaches 500 Members', date: 'Mar 10, 2026', img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=250&fit=crop', tag: 'Community' },
            { title: 'How to Optimize Your Facility Booking Flow', date: 'Mar 5, 2026', img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop', tag: 'Guide' }
          ].map((article, i) => (
            <div key={i} style={{
              borderRadius: 12,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.25, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,212,255,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <img src={article.img} alt={article.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} loading="lazy" />
              <div style={{ padding: 20 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1,
                  color: 'var(--accent)', background: 'var(--accent-dim)',
                  padding: '3px 10px', borderRadius: 4, marginBottom: 12, display: 'inline-block'
                }}>{article.tag}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8, marginTop: 8 }}>{article.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{article.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FINAL CTA ===== */}
      <Section id="cta" style={{
        padding: '80px 24px',
        background: 'var(--bg-secondary)',
        borderBottom: 'none'
      }}>
        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,0,0,0.3) 100%)',
          border: '1px solid rgba(0,212,255,0.1)',
          padding: '64px 48px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 40,
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
            letterSpacing: -0.5
          }}>
            Ready to transform your sports complex?
          </h2>
          <p style={{
            fontSize: 18,
            color: 'var(--text-secondary)',
            marginBottom: 40,
            maxWidth: 500,
            margin: '0 auto 40px',
            lineHeight: 1.7
          }}>
            Get started today and see why thousands of athletes and managers trust CloudSport.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register?role=athlete" className="btn btn-outline btn-lg pill" style={{ textDecoration: 'none', minWidth: 200, justifyContent: 'center' }}>
              Create Player Profile
            </Link>
            <Link to="/register?role=manager" className="btn btn-primary btn-lg pill" style={{ textDecoration: 'none', minWidth: 200, justifyContent: 'center' }}>
              Register a Facility
            </Link>
          </div>
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section id="faq" style={{ background: 'var(--bg-primary)' }}>
        <div className="faq-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'start'
        }}>
          <div style={{
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, transparent 100%)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.6 }}>❓</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Have questions?</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>We have answers.</p>
              <Link to="/contact" className="btn btn-outline btn-sm pill" style={{ textDecoration: 'none' }}>Contact Support</Link>
            </div>
          </div>

          <div>
            <span className="section-tag">FAQ</span>
            <h2 className="section-title" style={{ marginBottom: 24, fontSize: 32 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 20px',
                    color: activeFaq === i ? 'var(--accent)' : 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: 14,
                    transition: 'color 0.2s'
                  }}>
                    {faq.q}
                    <span style={{
                      transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      fontSize: 18,
                      color: 'var(--text-muted)'
                    }}>+</span>
                  </div>
                  {activeFaq === i && (
                    <div style={{
                      padding: '0 20px 18px',
                      fontSize: 14,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
