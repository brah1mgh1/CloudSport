import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const SportIcon = ({ name, color, size = 48 }) => {
  const s = size * 0.5
  const half = s * 0.5
  const icons = {
    Swimming: <><circle cx={s} cy={half} r={half*0.6} fill="none" stroke="white" strokeWidth="1.5"/><path d="M4 16l3-4 3 4 3-4 3 4 3-4" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></>,
    Tennis: <><circle cx={s} cy={s} r={s*0.6} fill="none" stroke="white" strokeWidth="1.5"/><line x1={s} y1="4" x2={s} y2={s*2-4} stroke="white" strokeWidth="1.5"/><line x1="4" y1={s} x2={s*2-4} y2={s} stroke="white" strokeWidth="1.5"/></>,
    Football: <><circle cx={s} cy={s} r={s*0.6} fill="none" stroke="white" strokeWidth="1.5"/><path d={`M${s} 4L${s*0.5} ${s}l${s*0.5} ${s} ${s*0.5}-${s}z`} fill="none" stroke="white" strokeWidth="1.5"/><circle cx={s} cy={s} r={s*0.25} fill="none" stroke="white" strokeWidth="1.5"/></>,
    Basketball: <><circle cx={s} cy={s} r={s*0.6} fill="none" stroke="white" strokeWidth="1.5"/><line x1={s} y1="4" x2={s} y2={s*2-4} stroke="white" strokeWidth="1.5"/><path d={`M4 ${s*0.6}h${s*2-8}M4 ${s*1.4}h${s*2-8}`} fill="none" stroke="white" strokeWidth="1.5"/></>,
    Volleyball: <><circle cx={s} cy={s} r={s*0.6} fill="none" stroke="white" strokeWidth="1.5"/><path d={`M${s*0.3} ${s*0.3}c${s*0.3} ${s*0.4} ${s*0.3} ${s*0.8} 0 ${s*1.4}M${s*1.7} ${s*0.3}c-${s*0.3} ${s*0.4}-${s*0.3} ${s*0.8} 0 ${s*1.4}M${s*0.3} ${s*1.7}c${s*0.4}-${s*0.3} ${s*0.8}-${s*0.3} ${s*1.4} 0M${s*0.3} ${s*0.3}c${s*0.4} ${s*0.3} ${s*0.8} ${s*0.3} ${s*1.4} 0`} fill="none" stroke="white" strokeWidth="1.5"/></>,
    Badminton: <><ellipse cx={s} cy={s*0.4} rx={s*0.25} ry={s*0.45} fill="none" stroke="white" strokeWidth="1.5"/><circle cx={s} cy={s*0.3} r={s*0.15} fill="white"/><path d={`M${s} ${s*0.85}l-${s*0.4} ${s*0.4}M${s} ${s*0.85}l${s*0.4} ${s*0.4}`} fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></>
  }
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: `0 4px 12px ${color}44`
    }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24">
        {icons[name] || null}
      </svg>
    </div>
  )
}

const clubItems = [
  { name: 'Swimming Clubs', img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=300&h=200&fit=crop', location: 'Downtown Aquatic Center' },
  { name: 'Tennis Clubs', img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=200&fit=crop', location: 'City Tennis Complex' },
  { name: 'Football Clubs', img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop', location: 'Metro Stadium' },
  { name: 'Basketball Clubs', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop', location: 'Indoor Sports Arena' },
  { name: 'Volleyball Clubs', img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=300&h=200&fit=crop', location: 'Beach Volleyball Center' },
  { name: 'Badminton Clubs', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&h=200&fit=crop', location: 'Elite Badminton Hall' }
]

const sportItems = [
  { name: 'Swimming', color: '#0ea5e9', img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=240&h=180&fit=crop' },
  { name: 'Tennis', color: '#84cc16', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=240&h=180&fit=crop' },
  { name: 'Football', color: '#22c55e', img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=240&h=180&fit=crop' },
  { name: 'Basketball', color: '#f97316', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=240&h=180&fit=crop' },
  { name: 'Volleyball', color: '#ef4444', img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=240&h=180&fit=crop' },
  { name: 'Badminton', color: '#a855f7', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=240&h=180&fit=crop' }
]

const navStyles = `
.nav-link {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: 6px;
  font-family: inherit;
  transition: all 0.2s;
}
.nav-link:hover { color: #fff; }
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.25, 1);
  transform: translateX(-50%);
  border-radius: 1px;
}
.nav-link:hover::after { width: 60%; }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.25, 1);
  background: rgba(18,18,26,0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 24px;
  z-index: 200;
  min-width: 280px;
}
.dropdown-trigger:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(4px);
}

.mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.25, 1);
  background: rgba(18,18,26,0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 24px;
  z-index: 200;
  width: 680px;
}
.mega-trigger:hover .mega-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(4px);
}

.club-card, .sport-card {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.25, 1);
  cursor: pointer;
}
.club-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0,212,255,0.2);
}
.sport-card:hover {
  transform: scale(1.05);
}
.sport-card:hover .sport-name {
  color: var(--accent);
}

.signup-btn {
  background: linear-gradient(135deg, var(--accent) 0%, #00b8e6 100%);
  color: #0a0a0f;
  font-weight: 700;
  border: none;
  border-radius: 25px;
  padding: 14px 32px;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.25, 1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.signup-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0,212,255,0.4);
  color: #0a0a0f;
}

@media (max-width: 1023px) {
  .dropdown-menu, .mega-menu { display: none !important; }
}
`

const roleLinks = {
  manager: [
    { to: '/manager/dashboard', label: 'Dashboard' },
    { to: '/manager/facilities', label: 'Facilities' },
    { to: '/manager/users', label: 'Users' },
    { to: '/manager/clubs', label: 'Clubs' },
    { to: '/manager/reservations', label: 'Reservations' },
    { to: '/manager/feedback', label: 'Feedback' },
    { to: '/manager/events', label: 'Events' },
    { to: '/manager/products', label: 'Store' },
    { to: '/manager/offers', label: 'Offers' }
  ],
  leader: [
    { to: '/leader/my-club', label: 'My Club' },
    { to: '/leader/groups', label: 'Groups' },
    { to: '/leader/booking', label: 'Book Facility' },
    { to: '/leader/reservations', label: 'My Reservations' },
    { to: '/leader/events', label: 'Events' }
  ],
  athlete: [
    { to: '/athlete/schedule', label: 'Schedule' },
    { to: '/athlete/groups', label: 'My Groups' },
    { to: '/athlete/notifications', label: 'Notifications' },
    { to: '/athlete/store', label: 'Store' }
  ]
}

const navLinks = [
  { id: 'how-it-works', label: 'FEATURES', type: 'scroll' },
  { id: 'clubs', label: 'CLUBS', hasDropdown: true, type: 'scroll' },
  { id: 'sports', label: 'SPORTS', hasMega: true, type: 'scroll' },
  { id: 'news-section', label: 'NEWS', type: 'scroll' },
  { id: 'contact', label: 'CONTACT US', type: 'route', to: '/contact' },
  { id: 'policy', label: 'POLICY', type: 'route', to: '/policy' }
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileClubOpen, setMobileClubOpen] = useState(false)
  const [mobileSportOpen, setMobileSportOpen] = useState(false)
  const menuRef = useRef()
  const hamburgerRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setMobileOpen(false)
      }
    }
    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleLogout = () => {
    logout()
    setTimeout(() => navigate('/'), 0)
  }

  const handleNavClick = (sectionId) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLinkClick = (path) => {
    setMobileOpen(false)
    navigate(path)
  }

  // Authenticated user navbar
  if (user) {
    const links = roleLinks[user.role] || []
    return (
      <>
        <style>{navStyles}</style>
        <nav style={{
          height: 'var(--navbar-height)',
          background: 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 110
        }}>
          <Link to={`/${user.role}/dashboard`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/logo.png" alt="CloudSport" className="navbar-logo" onError={e => { e.target.style.display = 'none' }} />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>CloudSport</span>
          </Link>

          <div className="desktop-nav" style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
            {links.map(link => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: 13, fontWeight: 500, color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    padding: '8px 16px', borderRadius: 6, textDecoration: 'none',
                    transition: 'all 0.2s', background: isActive ? 'var(--accent-dim)' : 'transparent'
                  }}
                  onMouseEnter={e => { if (!isActive) e.target.style.color = '#fff' }}
                  onMouseLeave={e => { if (!isActive) e.target.style.color = 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', overflow: 'hidden',
                background: user.profileImage ? 'transparent' : 'linear-gradient(135deg, var(--accent), #0088cc)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--border-light)', flexShrink: 0,
                transition: 'border-color 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
              >
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{user.name?.charAt(0)?.toUpperCase()}</span>
                )}
              </div>
              <span style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>{user.name}</span>
            </Link>
            <span className={`badge badge-${user.role}`} style={{ textTransform: 'capitalize' }}>
              {user.role}
            </span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
          </div>

          <button ref={hamburgerRef} className="hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </nav>

        <div ref={menuRef} className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          {/* Mobile profile avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', overflow: 'hidden',
              background: user.profileImage ? 'transparent' : 'linear-gradient(135deg, var(--accent), #0088cc)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid var(--border-light)', marginBottom: 10
            }}>
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>{user.name?.charAt(0)?.toUpperCase()}</span>
              )}
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{user.name}</span>
            <span className={`badge badge-${user.role}`} style={{ textTransform: 'capitalize', marginTop: 4 }}>{user.role}</span>
          </div>
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="nav-link-mobile">{link.label}</Link>
          ))}
          <div style={{ marginTop: 24, width: '100%', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <Link to="/profile" onClick={() => setMobileOpen(false)} className="btn btn-outline" style={{ width: '90%', justifyContent: 'center', textDecoration: 'none' }}>
              Edit Profile
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '90%', justifyContent: 'center' }}>Logout</button>
          </div>
        </div>
      </>
    )
  }

  // Public navbar
  return (
    <>
      <style>{navStyles}</style>
      <nav style={{
        height: 'var(--navbar-height)',
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 110
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.png" alt="CloudSport" className="navbar-logo" onError={e => { e.target.style.display = 'none' }} />
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>CloudSport</span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navLinks.map(link => {
            if (link.hasDropdown) {
              return (
                <div key={link.id} className="dropdown-trigger" style={{ position: 'relative' }}>
                  <button className="nav-link" onClick={() => handleNavClick('clubs')}>{link.label}</button>
                  <div className="dropdown-menu">
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 12,
                      minWidth: 500
                    }}>
                      {clubItems.map((club, i) => (
                        <div key={i} className="club-card" style={{
                          borderRadius: 12,
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)'
                        }} onClick={() => handleNavClick('clubs')}>
                          <img src={club.img} alt={club.name} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} loading="lazy" />
                          <div style={{ padding: 12 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{club.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{club.location}</div>
                            <span className="btn btn-primary btn-sm" style={{ padding: '6px 14px', fontSize: 11, textDecoration: 'none' }}>View Details</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
            if (link.hasMega) {
              return (
                <div key={link.id} className="mega-trigger" style={{ position: 'relative' }}>
                  <button className="nav-link" onClick={() => handleNavClick('sports')}>{link.label}</button>
                  <div className="mega-menu" style={{ width: 700 }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 16
                    }}>
                      {sportItems.map((sport, i) => (
                        <div key={i} className="sport-card" style={{
                          borderRadius: 12,
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          textAlign: 'center'
                        }} onClick={() => handleNavClick('sports')}>
                          <img src={sport.img} alt={sport.name} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} loading="lazy" />
                          <div style={{ padding: 10, textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                              <SportIcon name={sport.name} color={sport.color} size={32} />
                            </div>
                            <div className="sport-name" style={{ fontSize: 13, fontWeight: 600, color: '#fff', transition: 'color 0.3s' }}>{sport.name}</div>
                            <div style={{ fontSize: 11, color: sport.color, marginTop: 2 }}>Learn More →</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
            if (link.type === 'route') {
              return (
                <Link key={link.id} to={link.to} className="nav-link" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  {link.label}
                </Link>
              )
            }
            return (
              <button key={link.id} className="nav-link" onClick={() => handleNavClick(link.id)}>
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/login" style={{
            fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
            padding: '8px 16px', borderRadius: 6, textDecoration: 'none',
            transition: 'color 0.2s'
          }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
            Sign In
          </Link>
          <Link to="/register?role=athlete" className="signup-btn">Get Started</Link>
        </div>

        {/* Hamburger Button */}
        <button ref={hamburgerRef} className="hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map(link => {
          if (link.hasDropdown) {
            return (
              <div key={link.id} style={{ width: '100%' }}>
                <button onClick={() => setMobileClubOpen(!mobileClubOpen)} style={{
                  fontSize: 18, padding: '16px 0', width: '100%', textAlign: 'center',
                  color: 'var(--text-secondary)', background: 'none', border: 'none',
                  fontFamily: 'inherit', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 8
                }}>
                  {link.label} <span style={{ transform: mobileClubOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                </button>
                {mobileClubOpen && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 24px 16px' }}>
                    {clubItems.map((club, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        onClick={() => { setMobileOpen(false); handleNavClick('clubs') }}>
                        <img src={club.img} alt={club.name} style={{ width: 50, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{club.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{club.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          if (link.hasMega) {
            return (
              <div key={link.id} style={{ width: '100%' }}>
                <button onClick={() => setMobileSportOpen(!mobileSportOpen)} style={{
                  fontSize: 18, padding: '16px 0', width: '100%', textAlign: 'center',
                  color: 'var(--text-secondary)', background: 'none', border: 'none',
                  fontFamily: 'inherit', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 8
                }}>
                  {link.label} <span style={{ transform: mobileSportOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                </button>
                {mobileSportOpen && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: '0 24px 16px' }}>
                    {sportItems.map((sport, i) => (
                      <div key={i} style={{ textAlign: 'center', padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}
                        onClick={() => { setMobileOpen(false); handleNavClick('sports') }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                          <SportIcon name={sport.name} color={sport.color} size={32} />
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginTop: 4 }}>{sport.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          if (link.type === 'route') {
            return (
              <Link key={link.id} to={link.to} onClick={() => setMobileOpen(false)}
                style={{ fontSize: 18, padding: '16px 0', width: '100%', textAlign: 'center', color: 'var(--text-secondary)', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
                {link.label}
              </Link>
            )
          }
          return (
            <button key={link.id} onClick={() => { setMobileOpen(false); handleNavClick(link.id) }}
              style={{ fontSize: 18, padding: '16px 0', width: '100%', textAlign: 'center', color: 'var(--text-secondary)', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
              {link.label}
            </button>
          )
        })}
        <div style={{ marginTop: 24, width: '100%', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <Link to="/login" className="btn btn-outline" style={{ width: '90%', justifyContent: 'center', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Sign In</Link>
          <Link to="/register?role=athlete" className="btn btn-primary" style={{ width: '90%', justifyContent: 'center', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Get Started</Link>
        </div>
      </div>
    </>
  )
}
