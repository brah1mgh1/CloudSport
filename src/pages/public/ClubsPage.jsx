import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export default function ClubsPage() {
  const { data, loading } = useFetch('/clubs')
  const clubs = data?.clubs || []

  if (loading) return <div className="loading">Loading clubs...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 8 }}>Our Clubs</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
        Explore our professional sports clubs. Join a community of athletes and compete at the highest level.
      </p>

      {clubs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <h3>No Clubs Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Clubs will appear here once they are created.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {clubs.map(c => (
            <div key={c.id} className="card" style={{ borderLeft: '4px solid var(--accent)', padding: 28 }}>
              <h2 style={{ fontSize: 24, marginBottom: 4 }}>{c.name}</h2>
              {c.sportType && (
                <span className="badge badge-manager" style={{ marginBottom: 12, display: 'inline-block' }}>{c.sportType}</span>
              )}
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{c.description || 'No description available.'}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 24, fontSize: 13 }}>
                <div style={{ color: 'var(--accent)' }}><strong>{c.Users?.length || 0}</strong> Members</div>
                <div style={{ color: 'var(--accent)' }}><strong>{c.Groups?.length || 0}</strong> Groups</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Join a Club
        </Link>
      </div>
    </div>
  )
}
