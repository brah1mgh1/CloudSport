import { useFetch, useMutate } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'
import Button from '../../components/common/Button'

export default function NotificationsPage() {
  const { data, loading, refetch } = useFetch('/notifications')
  const { mutate } = useMutate()

  const notifications = data?.notifications || []

  const markRead = async (id) => {
    try { await mutate('put', `/notifications/read/${id}`); refetch() } catch {}
  }

  const markAllRead = async () => {
    try { await mutate('put', '/notifications/read-all'); refetch() } catch {}
  }

  const handleDelete = async (id) => {
    try { await mutate('delete', `/notifications/${id}`); refetch() } catch {}
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Notifications</h1>
        {notifications.some(n => !n.read) && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>Mark All Read</Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <h3>No Notifications</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <div>
          {notifications.map(n => (
            <div key={n.id} className="card" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              opacity: n.read ? 0.7 : 1,
              borderLeft: n.read ? '4px solid transparent' : '4px solid var(--accent)'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15 }}>{n.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{n.message}</p>
                <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{formatDate(n.createdAt)}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {!n.read && <Button variant="secondary" size="sm" onClick={() => markRead(n.id)}>Read</Button>}
                <Button variant="danger" size="sm" onClick={() => handleDelete(n.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
