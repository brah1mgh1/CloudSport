import { useState, useEffect } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import Button from '../common/Button'

export default function ReservationForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    facilityId: '', groupId: '', date: '', startTime: '', endTime: '', purpose: ''
  })
  const { data: facilitiesRes } = useFetch('/facilities')
  const { data: groupsRes } = useFetch('/groups/my')
  const { mutate, loading } = useMutate()

  const facilities = facilitiesRes?.facilities || []
  const groups = groupsRes?.groups || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await mutate('post', '/reservations', form)
      if (onSuccess) onSuccess(result)
    } catch {}
  }

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const timeSlots = []
  for (let h = 8; h < 22; h++) {
    timeSlots.push(`${h.toString().padStart(2, '0')}:00`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-2">
        <div className="form-group">
          <label>Facility</label>
          <select value={form.facilityId} onChange={e => update('facilityId', e.target.value)} required>
            <option value="">Select facility</option>
            {facilities.map(f => (
              <option key={f.id} value={f.id}>{f.name} - ${f.pricePerHour}/hr</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Group</label>
          <select value={form.groupId} onChange={e => update('groupId', e.target.value)} required>
            <option value="">Select group</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={form.date} onChange={e => update('date', e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <select value={form.startTime} onChange={e => update('startTime', e.target.value)} required>
            <option value="">Select start</option>
            {timeSlots.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>End Time</label>
          <select value={form.endTime} onChange={e => update('endTime', e.target.value)} required>
            <option value="">Select end</option>
            {timeSlots.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Purpose</label>
          <input value={form.purpose} onChange={e => update('purpose', e.target.value)} placeholder="e.g. Training session" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Request'}</Button>
      </div>
    </form>
  )
}
