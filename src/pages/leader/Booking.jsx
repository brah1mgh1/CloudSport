import { useState } from 'react'
import ReservationForm from '../../components/forms/ReservationForm'
import { useFetch } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

export default function Booking() {
  const { data: facilitiesRes } = useFetch('/facilities')
  const { data: reservationsRes, refetch } = useFetch('/reservations')
  const [showForm, setShowForm] = useState(false)

  const facilities = facilitiesRes?.facilities || []
  const reservations = reservationsRes?.reservations || []

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Book a Facility</h1>
        <Button onClick={() => setShowForm(true)}>New Reservation</Button>
      </div>

      <h2 style={{ marginBottom: 12, fontSize: 18 }}>Available Facilities</h2>
      <div className="grid grid-3" style={{ marginBottom: 32 }}>
        {facilities.filter(f => f.available).map(f => (
          <div key={f.id} className="card">
            <h3>{f.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{f.description}</p>
              <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <div>Capacity: {f.capacity}</div>
              <div><strong style={{ color: 'var(--accent)' }}>${f.pricePerHour}/hour</strong></div>
              <div>Sport: {f.sportType}</div>
            </div>
            <Button size="sm" style={{ marginTop: 12 }} onClick={() => setShowForm(true)}>Book Now</Button>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 16 }}>My Reservation Requests</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.Facility?.name}</td>
                <td>{formatDate(r.date)}</td>
                <td>{r.startTime} - {r.endTime}</td>
                <td>${r.amount}</td>
                <td><span className={`badge badge-${r.status}`}>{r.status}</span></td>
                <td>
                  <span className={`badge ${r.paymentStatus === 'paid' ? 'badge-approved' : 'badge-pending'}`}>
                    {r.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="New Reservation Request">
        <ReservationForm onSuccess={() => { setShowForm(false); refetch() }} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  )
}
