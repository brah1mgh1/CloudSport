import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../context/AuthContext'
import { formatDate, formatTime } from '../../utils/dateHelpers'

export default function Schedule() {
  const { user } = useAuth()
  const { data: reservationsRes, loading } = useFetch('/reservations')
  const { data: groupsRes } = useFetch('/groups/my')

  const reservations = reservationsRes?.reservations || []
  const groups = groupsRes?.groups || []

  const groupReservations = reservations.filter(r => {
    const myGroupIds = groups.map(g => g.id)
    return myGroupIds.includes(r.groupId) && r.status === 'approved'
  })

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 8 }}>My Schedule</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>View your group's upcoming reservations</p>

      <div className="card">
        {groupReservations.length === 0 ? (
          <div className="empty-state">
            <h3>No Upcoming Activities</h3>
            <p>You have no scheduled reservations for your groups.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Group</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {groupReservations.map(r => (
                <tr key={r.id}>
                  <td>{r.Facility?.name}</td>
                  <td>{r.Group?.name}</td>
                  <td>{formatDate(r.date)}</td>
                  <td>{formatTime(r.startTime)} - {formatTime(r.endTime)}</td>
                  <td>{r.purpose || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
