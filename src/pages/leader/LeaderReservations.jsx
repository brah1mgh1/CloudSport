import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import { formatDate, formatTime } from '../../utils/dateHelpers'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

export default function LeaderReservations() {
  const { data, loading, refetch } = useFetch('/reservations')
  const { mutate } = useMutate()
  const [changeModal, setChangeModal] = useState(null)
  const [changeForm, setChangeForm] = useState({ date: '', startTime: '', endTime: '' })

  const reservations = data?.reservations || []

  const handleCancel = async (id) => {
    if (!confirm('Cancel this reservation?')) return
    try { await mutate('put', `/reservations/cancel/${id}`); refetch() } catch {}
  }

  const openChange = (r) => {
    setChangeForm({ date: r.date, startTime: r.startTime, endTime: r.endTime })
    setChangeModal(r.id)
  }

  const submitChange = async (e) => {
    e.preventDefault()
    try { await mutate('put', `/reservations/change/${changeModal}`, changeForm); setChangeModal(null); refetch() } catch {}
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 20 }}>My Reservations</h1>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.Facility?.name}</td>
                <td>{r.Group?.name || '-'}</td>
                <td>{formatDate(r.date)}</td>
                <td>{formatTime(r.startTime)} - {formatTime(r.endTime)}</td>
                <td>${r.amount}</td>
                <td><span className={`badge badge-${r.status}`}>{r.status}</span></td>
                <td>
                  <span className={`badge ${r.paymentStatus === 'paid' ? 'badge-approved' : 'badge-pending'}`}>
                    {r.paymentStatus}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {(r.status === 'approved' || r.status === 'pending') && (
                      <>
                        <Button variant="secondary" size="sm" onClick={() => openChange(r)}>Change</Button>
                        <Button variant="danger" size="sm" onClick={() => handleCancel(r.id)}>Cancel</Button>
                      </>
                    )}
                    {r.status === 'approved' && r.paymentStatus === 'unpaid' && (
                      <Button variant="success" size="sm" onClick={async () => {
                        try {
                          await mutate('post', `/reservations/pay/${r.id}`)
                          refetch()
                        } catch {}
                      }}>Pay</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!changeModal} onClose={() => setChangeModal(null)} title="Change Reservation">
        <form onSubmit={submitChange}>
          <div className="form-group">
            <label>New Date</label>
            <input type="date" value={changeForm.date} onChange={e => setChangeForm({ ...changeForm, date: e.target.value })} required />
          </div>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Start Time</label>
              <input type="time" value={changeForm.startTime} onChange={e => setChangeForm({ ...changeForm, startTime: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input type="time" value={changeForm.endTime} onChange={e => setChangeForm({ ...changeForm, endTime: e.target.value })} required />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={() => setChangeModal(null)}>Cancel</Button>
            <Button type="submit">Request Change</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
