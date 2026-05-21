import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import PageWrapper from '../../components/common/PageWrapper'

export default function UserMgmt() {
  const { data, loading, refetch } = useFetch('/users')
  const { data: clubsRes } = useFetch('/clubs')
  const { mutate } = useMutate()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'athlete', phone: '', clubId: '' })

  const users = data?.users || []
  const clubs = clubsRes?.clubs || []

  const openEdit = (u) => {
    setForm({ name: u.name, email: u.email, role: u.role, phone: u.phone || '', clubId: u.clubId || '' })
    setEditing(u.id)
    setModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await mutate('put', `/users/${editing}`, form)
      setModal(false)
      refetch()
    } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try { await mutate('delete', `/users/${id}`) } catch (e) { console.error('Delete failed:', e) }
    refetch()
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <PageWrapper className="page-container">
      <h1 style={{ marginBottom: 20 }}>User Management</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Club</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={`badge badge-${u.role}`} style={{ textTransform: 'capitalize' }}>{u.role}</span></td>
                <td>{u.phone || '-'}</td>
                <td>{u.Club?.name || '-'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="secondary" size="sm" onClick={() => openEdit(u)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(u.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Edit User">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="manager">Manager</option>
                <option value="leader">Club Leader</option>
                <option value="athlete">Athlete</option>
              </select>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Club</label>
              <select value={form.clubId} onChange={e => setForm({ ...form, clubId: e.target.value })}>
                <option value="">None</option>
                {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
            <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  )
}
