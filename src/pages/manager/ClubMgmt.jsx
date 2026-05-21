import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

const emptyClub = { name: '', description: '', sportType: '', leaderId: '' }

export default function ClubMgmt() {
  const { data, loading, refetch } = useFetch('/clubs')
  const { data: leadersRes } = useFetch('/users/role/leader')
  const { mutate } = useMutate()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyClub)

  const clubs = data?.clubs || []
  const leaders = leadersRes?.users || []

  const openCreate = () => { setForm(emptyClub); setEditing(null); setModal(true) }
  const openEdit = (c) => { setForm({ name: c.name, description: c.description || '', sportType: c.sportType || '', leaderId: c.leaderId || '' }); setEditing(c.id); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) await mutate('put', `/clubs/${editing}`, form)
      else await mutate('post', '/clubs', form)
      setModal(false); refetch()
    } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this club?')) return
    try { await mutate('delete', `/clubs/${id}`) } catch (e) { console.error('Delete failed:', e) }
    refetch()
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Club Management</h1>
        <Button onClick={openCreate}>Add Club</Button>
      </div>

      <div className="grid grid-2">
        {clubs.map(c => (
          <div key={c.id} className="card">
            <h3>{c.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{c.description}</p>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span>Sport: {c.sportType || 'N/A'} | </span>
              <span>Members: {c.Users?.length || 0} | </span>
              <span>Groups: {c.Groups?.length || 0}</span>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" onClick={() => openEdit(c)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Club' : 'Add Club'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Sport Type</label>
            <input value={form.sportType} onChange={e => setForm({ ...form, sportType: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Leader</label>
            <select value={form.leaderId} onChange={e => setForm({ ...form, leaderId: e.target.value })}>
              <option value="">Select leader</option>
              {leaders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
