import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import { formatDate, formatTime } from '../../utils/dateHelpers'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

export default function ReservationMgmt() {
  const { data, loading, refetch } = useFetch('/reservations/all')
  const { mutate } = useMutate()
  const [filter, setFilter] = useState('pending')
  const [noteModal, setNoteModal] = useState(null)
  const [note, setNote] = useState('')
  const [action, setAction] = useState('')

  const reservations = (data?.reservations || []).filter(r => filter === 'all' || r.status === filter)

  const handleAction = async (id, actionType) => {
    if (actionType === 'approve') {
      setNoteModal(id)
      setAction('approve')
      setNote('')
    } else {
      setNoteModal(id)
      setAction('deny')
      setNote('')
    }
  }

  const confirmAction = async () => {
    try {
      if (action === 'approve') {
        await mutate('put', `/reservations/approve/${noteModal}`, { adminNote: note })
      } else {
        await mutate('put', `/reservations/deny/${noteModal}`, { adminNote: note })
      }
      setNoteModal(null)
      refetch()
    } catch {}
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 20 }}>Reservation Management</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['pending', 'approved', 'denied', 'change_requested', 'all'].map(f => (
          <Button key={f} variant={filter === f ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter(f)}>
            {f === 'change_requested' ? 'Change Requests' : f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Leader</th>
              <th>Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No reservations found</td></tr>
            )}
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.Facility?.name}</td>
                <td>{r.leader?.name}</td>
                <td>{r.Group?.name || '-'}</td>
                <td>{formatDate(r.date)}</td>
                <td>{formatTime(r.startTime)} - {formatTime(r.endTime)}</td>
                <td>${r.amount}</td>
                <td><span className={`badge badge-${r.status}`}>{r.status}</span></td>
                <td>
                  {r.status === 'pending' || r.status === 'change_requested' ? (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Button variant="success" size="sm" onClick={() => handleAction(r.id, 'approve')}>Approve</Button>
                      <Button variant="danger" size="sm" onClick={() => handleAction(r.id, 'deny')}>Deny</Button>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                      {r.adminNote && `Note: ${r.adminNote}`}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!noteModal} onClose={() => setNoteModal(null)} title={`${action === 'approve' ? 'Approve' : 'Deny'} Reservation`}>
        <div className="form-group">
          <label>Admin Note (optional)</label>
          <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note..." />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setNoteModal(null)}>Cancel</Button>
          <Button variant={action === 'approve' ? 'success' : 'danger'} onClick={confirmAction}>
            {action === 'approve' ? 'Approve' : 'Deny'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
