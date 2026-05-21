import { useFetch, useMutate } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'
import Button from '../../components/common/Button'

export default function FeedbackMgmt() {
  const { data, loading, refetch } = useFetch('/feedback')
  const { mutate } = useMutate()

  const feedbacks = data?.feedbacks || []

  const handleDelete = async (id) => {
    if (!confirm('Delete this feedback?')) return
    try { await mutate('delete', `/feedback/${id}`) } catch (e) { console.error('Delete failed:', e) }
    refetch()
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 20 }}>Feedback Management</h1>
      <div className="card">
        {feedbacks.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No feedback yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(f => (
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td>{f.email || '-'}</td>
                  <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.message}</td>
                  <td>{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</td>
                  <td>{formatDate(f.createdAt)}</td>
                  <td><Button variant="danger" size="sm" onClick={() => handleDelete(f.id)}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
