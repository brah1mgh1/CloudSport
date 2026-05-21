import { useFetch } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'

export default function NewsPage() {
  const { data: eventsRes, loading } = useFetch('/events')
  const events = eventsRes?.events || []

  if (loading) return <div className="loading">Loading news...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 8 }}>Latest News</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
        Stay up to date with tournaments, events, and announcements from our sports community.
      </p>

      {events.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <h3>No News Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>News and events will appear here once they are created.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {events.map(e => (
            <div key={e.id} className="card" style={{ borderLeft: '4px solid var(--accent)', padding: 28 }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                {formatDate(e.date)} {e.time && `at ${e.time}`}
              </div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>{e.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{e.description || 'No description available.'}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
                <span>Type: <strong style={{ color: 'var(--accent)' }}>{e.type}</strong></span>
                {e.location && <span>Location: <strong style={{ color: 'var(--accent)' }}>{e.location}</strong></span>}
                <span className={`badge badge-${e.status === 'completed' ? 'approved' : e.status === 'cancelled' ? 'denied' : 'pending'}`}>
                  {e.status}
                </span>
              </div>
              {e.club1?.name && e.club2?.name && (
                <div style={{ marginTop: 8, fontSize: 15, color: 'var(--accent)', fontWeight: 600 }}>
                  {e.club1.name} vs {e.club2.name}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
