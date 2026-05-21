import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useFetch, useMutate } from '../../hooks/useFetch'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

export default function GroupMgmt() {
  const { user } = useAuth()
  const { data: clubsRes } = useFetch('/clubs')
  const clubs = clubsRes?.clubs || []
  const myClub = clubs.find(c => c.leaderId === user.id)

  const { data: groupsRes, loading, refetch } = useFetch(myClub ? `/groups/club/${myClub.id}` : null)
  const { data: requestsRes, refetch: refetchRequests } = useFetch('/groups/pending-requests')
  const { mutate } = useMutate()

  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })

  const groups = groupsRes?.groups || []
  const requests = requestsRes?.requests || []

  const createGroup = async (e) => {
    e.preventDefault()
    try {
      await mutate('post', '/groups', { ...form, clubId: myClub.id })
      setModal(false); setForm({ name: '', description: '' }); refetch()
    } catch {}
  }

  const handleApprove = async (id) => {
    try { await mutate('put', `/groups/approve/${id}`); refetchRequests(); refetch() } catch {}
  }

  const handleReject = async (id) => {
    try { await mutate('put', `/groups/reject/${id}`); refetchRequests() } catch {}
  }

  const handleDeleteGroup = async (id) => {
    if (!confirm('Delete this group?')) return
    try { await mutate('delete', `/groups/${id}`); refetch() } catch {}
  }

  if (!myClub) {
    return <div className="page-container"><h1>Groups</h1><div className="card"><p style={{ color: 'var(--text-secondary)' }}>You are not assigned to a club.</p></div></div>
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Group Management</h1>
        <Button onClick={() => setModal(true)}>Create Group</Button>
      </div>

      {requests.length > 0 && (
        <div className="card" style={{ marginBottom: 20, borderLeft: '4px solid var(--warning)' }}>
          <h2 style={{ marginBottom: 12 }}>Pending Join Requests ({requests.length})</h2>
          <table className="table">
            <thead>
              <tr><th>Athlete</th><th>Group</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id}>
                  <td>{r.User?.name}</td>
                  <td>{r.Group?.name}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Button variant="success" size="sm" onClick={() => handleApprove(r.id)}>Approve</Button>
                      <Button variant="danger" size="sm" onClick={() => handleReject(r.id)}>Reject</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-2">
        {groups.map(g => (
          <div key={g.id} className="card">
            <h3>{g.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{g.description}</p>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              Members: {g.Subscriptions?.filter(s => s.status === 'approved').length || 0}
            </div>
            <div style={{ marginTop: 12 }}>
              <Button variant="danger" size="sm" onClick={() => handleDeleteGroup(g.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create Group">
        <form onSubmit={createGroup}>
          <div className="form-group">
            <label>Group Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
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
