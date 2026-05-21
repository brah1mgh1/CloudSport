import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'
import { useAuth } from '../../context/AuthContext'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

export default function LeaderEvents() {
  const { user } = useAuth()
  const { data: eventsRes } = useFetch('/events')
  const { data: clubsRes } = useFetch('/clubs')
  const { mutate } = useMutate()
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', date: '', time: '', location: '', type: 'friendly', club1Id: '', club2Id: '' })

  const events = eventsRes?.events || []
  const clubs = clubsRes?.clubs || []
  const myClub = clubs.find(c => c.leaderId === user.id)
  const myEvents = events.filter(e => e.club1Id === myClub?.id || e.club2Id === myClub?.id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try { await mutate('post', '/events', form); setModal(false) } catch {}
  }

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Events</h1>
        <Button onClick={() => { setForm({ ...form, club1Id: myClub?.id || '' }); setModal(true) }}>Create Event</Button>
      </div>

      <div className="grid grid-2">
        {myEvents.map(e => (
          <div key={e.id} className="card">
            <h3>{e.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.description}</p>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <div>Date: {formatDate(e.date)} {e.time && `at ${e.time}`}</div>
              <div>Type: {e.type}</div>
              <div>{e.club1?.name} vs {e.club2?.name}</div>
              <span className={`badge badge-${e.status}`}>{e.status}</span>
            </div>
          </div>
        ))}
        {myEvents.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No events for your club</p>}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create Friendly Event">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="friendly">Friendly</option>
                <option value="competition">Competition</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Opponent Club</label>
              <select value={form.club2Id} onChange={e => setForm({ ...form, club2Id: e.target.value })} required>
                <option value="">Select club</option>
                {clubs.filter(c => c.id !== myClub?.id).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
