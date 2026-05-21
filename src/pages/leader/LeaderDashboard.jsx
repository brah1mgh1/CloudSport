import { useAuth } from '../../context/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'
import { Link } from 'react-router-dom'

export default function LeaderDashboard() {
  const { user } = useAuth()
  const { data: clubsRes } = useFetch('/clubs')
  const { data: reservationsRes } = useFetch('/reservations')

  const clubs = clubsRes?.clubs || []
  const myClub = clubs.find(c => c.leaderId === user.id)
  const reservations = reservationsRes?.reservations || []

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 8 }}>Welcome, {user.name}</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Club Leader Dashboard</p>

      {myClub ? (
        <div className="card" style={{ marginBottom: 20 }}>
          <h2>{myClub.name}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{myClub.description}</p>
          <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
            Sport: {myClub.sportType || 'N/A'} | Members: {myClub.Users?.length || 0}
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: 20 }}>
          <p style={{ color: 'var(--text-secondary)' }}>You are not assigned to a club yet.</p>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2>My Reservations</h2>
          <Link to="/leader/booking" className="btn btn-sm btn-primary">Book Facility</Link>
        </div>
        {reservations.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No reservations yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.slice(0, 5).map(r => (
                <tr key={r.id}>
                  <td>{r.Facility?.name}</td>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.startTime} - {r.endTime}</td>
                  <td><span className={`badge badge-${r.status}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
