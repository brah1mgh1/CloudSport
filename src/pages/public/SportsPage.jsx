import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export default function SportsPage() {
  const { data, loading } = useFetch('/facilities')
  const facilities = data?.facilities || []

  if (loading) return <div className="loading">Loading facilities...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 8 }}>Sports & Facilities</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
        Browse our state-of-the-art sports facilities available for booking.
      </p>

      {facilities.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <h3>No Facilities Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Facilities will appear here once they are added.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {facilities.map(f => (
            <div key={f.id} className="card" style={{ borderLeft: '4px solid var(--accent)', padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: 22, marginBottom: 4 }}>{f.name}</h2>
                  <span className={`badge ${f.available ? 'badge-approved' : 'badge-denied'}`}>
                    {f.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>${f.pricePerHour}<span style={{ fontSize: 14, fontWeight: 400 }}>/hr</span></div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginTop: 12 }}>{f.description || 'No description available.'}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
                {f.sportType && <span>Sport: <strong style={{ color: 'var(--accent)' }}>{f.sportType}</strong></span>}
                {f.capacity && <span>Capacity: <strong style={{ color: 'var(--accent)' }}>{f.capacity}</strong></span>}
                {f.location && <span>Location: <strong style={{ color: 'var(--accent)' }}>{f.location}</strong></span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Book a Facility
        </Link>
      </div>
    </div>
  )
}
