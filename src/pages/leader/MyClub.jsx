import { useAuth } from '../../context/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { Link } from 'react-router-dom'

export default function MyClub() {
  const { user } = useAuth()
  const { data: clubsRes } = useFetch('/clubs')

  const clubs = clubsRes?.clubs || []
  const myClub = clubs.find(c => c.leaderId === user.id)

  if (!myClub) {
    return (
      <div className="page-container">
        <h1>My Club</h1>
        <div className="card">
          <p style={{ color: 'var(--text-secondary)' }}>You are not assigned to a club yet. Contact a manager.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 20 }}>{myClub.name}</h1>

      <div className="card" style={{ marginBottom: 20 }}>
        <h2>Club Details</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>{myClub.description}</p>
        <div style={{ marginTop: 12, fontSize: 14, color: 'var(--text-secondary)' }}>
          <div><strong>Sport Type:</strong> {myClub.sportType || 'N/A'}</div>
          <div><strong>Members:</strong> {myClub.Users?.length || 0}</div>
          <div><strong>Groups:</strong> {myClub.Groups?.length || 0}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2>Groups</h2>
          <Link to="/leader/groups" className="btn btn-sm btn-primary">Manage Groups</Link>
        </div>
        {(!myClub.Groups || myClub.Groups.length === 0) ? (
          <p style={{ color: 'var(--text-secondary)' }}>No groups yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Athletes</th></tr>
            </thead>
            <tbody>
              {myClub.Groups.map(g => (
                <tr key={g.id}><td>{g.name}</td><td>{g.Subscriptions?.filter(s => s.status === 'approved').length || 0}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
