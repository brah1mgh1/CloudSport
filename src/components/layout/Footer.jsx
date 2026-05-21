import { Link } from 'react-router-dom'

const footerStyles = `
@media (max-width: 767px) {
  .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
}
`

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer style={{
      background: '#0d111c',
      borderTop: '1px solid rgba(0, 212, 255, 0.15)',
      padding: '60px 24px 24px'
    }}>
      <style>{footerStyles}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40,
          marginBottom: 48
        }}>
          {/* Column 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/logo.png" alt="CloudSport" style={{ height: 36 }} onError={e => { e.target.style.display = 'none' }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>CloudSport</span>
            </div>
            <p style={{ fontSize: 13, color: '#b0b9c3', lineHeight: 1.7, marginBottom: 20 }}>
              The all-in-one platform for sports complex management.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'f', url: '#' },
                { label: '𝕏', url: '#' },
                { label: 'in', url: '#' },
                { label: '▶', url: '#' }
              ].map((s, i) => (
                <a key={i} href={s.url} style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#b0b9c3',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(0,212,255,0.1)'; e.target.style.color = 'var(--accent)'; e.target.style.borderColor = 'rgba(0,212,255,0.3)' }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.color = '#b0b9c3'; e.target.style.borderColor = 'rgba(255,255,255,0.06)' }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Home', onClick: () => scrollTo('how-it-works') },
                { label: 'Clubs', onClick: () => scrollTo('clubs') },
                { label: 'Sports', onClick: () => scrollTo('sports') },
                { label: 'News', as: Link, to: '/news' },
                { label: 'Pricing', onClick: () => scrollTo('pricing') },
                { label: 'FAQ', onClick: () => scrollTo('faq') }
              ].map((item, i) => {
                if (item.as === Link) {
                  return (
                    <Link key={i} to={item.to} style={{
                      fontSize: 13, color: '#b0b9c3', textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = '#b0b9c3'}
                    >{item.label}</Link>
                  )
                }
                return (
                  <button key={i} onClick={item.onClick} style={{
                    fontSize: 13, color: '#b0b9c3', textDecoration: 'none',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', textAlign: 'left', padding: 0,
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = '#b0b9c3'}
                  >{item.label}</button>
                )
              })}
            </div>
          </div>

          {/* Column 3: For Athletes */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>For Athletes</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Athlete Portal', to: '/register?role=athlete', as: Link },
                { label: 'Documentation', to: '/about', as: Link },
                { label: 'Help & Support', to: '/contact', as: Link },
                { label: 'Community', onClick: () => scrollTo('testimonials') },
                { label: 'Get Started', to: '/register?role=athlete', as: Link, primary: true }
              ].map((item, i) => {
                if (item.primary) {
                  return (
                    <Link key={i} to={item.to} style={{
                      fontSize: 13, color: 'var(--accent)', textDecoration: 'none',
                      fontWeight: 600, transition: 'color 0.3s'
                    }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'var(--accent)'}
                    >{item.label} →</Link>
                  )
                }
                return (
                  <Link key={i} to={item.to} style={{
                    fontSize: 13, color: '#b0b9c3', textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = '#b0b9c3'}
                  >{item.label}</Link>
                )
              })}
            </div>
          </div>

          {/* Column 4: For Managers */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>For Managers</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Manager Dashboard', to: '/register?role=manager', as: Link },
                { label: 'Analytics', to: '/about', as: Link },
                { label: 'Settings', onClick: () => scrollTo('for-managers') },
                { label: 'Training Resources', to: '/about', as: Link },
                { label: 'Contact Support', to: '/contact', as: Link, primary: true }
              ].map((item, i) => {
                if (item.primary) {
                  return (
                    <Link key={i} to={item.to} style={{
                      fontSize: 13, color: 'var(--accent)', textDecoration: 'none',
                      fontWeight: 600, transition: 'color 0.3s'
                    }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'var(--accent)'}
                    >{item.label} →</Link>
                  )
                }
                return (
                  <Link key={i} to={item.to} style={{
                    fontSize: 13, color: '#b0b9c3', textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = '#b0b9c3'}
                  >{item.label}</Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: 12,
          color: 'var(--text-muted)'
        }}>
          <span>&copy; {year} CloudSport Features. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/policy" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >Privacy Policy</Link>
            <Link to="/policy" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >Terms of Service</Link>
            <Link to="/policy" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
