import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import { useAuth } from '../../context/AuthContext'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

export default function MyGroups() {
  const { user } = useAuth()
  const { data: groupsRes, loading, refetch } = useFetch('/groups/my')
  const { data: clubsRes } = useFetch('/clubs')
  const { data: subsRes } = useFetch('/subscriptions/my')
  const { mutate } = useMutate()

  const [joinModal, setJoinModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')

  const myGroups = groupsRes?.groups || []
  const clubs = clubsRes?.clubs || []
  const subscriptions = subsRes?.subscriptions || []

  const handleJoinRequest = async (e) => {
    e.preventDefault()
    try {
      await mutate('post', '/groups/join', { groupId: parseInt(selectedGroup) })
      setJoinModal(false)
      setSelectedGroup('')
    } catch {}
  }

  const handleLeave = async (groupId) => {
    if (!confirm('Leave this group?')) return
    try { await mutate('delete', `/groups/leave/${groupId}`); refetch() } catch {}
  }

  const pendingGroupIds = subscriptions.filter(s => s.status === 'pending').map(s => s.groupId)

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>My Groups</h1>
        <Button onClick={() => setJoinModal(true)}>Join a Group</Button>
      </div>

      {myGroups.length === 0 && subscriptions.filter(s => s.status === 'pending').length === 0 ? (
        <div className="empty-state">
          <h3>No Groups Yet</h3>
          <p>Request to join a group from one of the clubs.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-2" style={{ marginBottom: 20 }}>
            {myGroups.map(g => (
              <div key={g.id} className="card">
                <h3>{g.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{g.Club?.name}</p>
                <Button variant="danger" size="sm" style={{ marginTop: 12 }} onClick={() => handleLeave(g.id)}>Leave</Button>
              </div>
            ))}
          </div>

          {pendingGroupIds.length > 0 && (
            <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
              <h3>Pending Requests</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                You have {pendingGroupIds.length} pending join request(s). Waiting for club leader approval.
              </p>
            </div>
          )}
        </>
      )}

      <Modal isOpen={joinModal} onClose={() => setJoinModal(false)} title="Join a Group">
        <form onSubmit={handleJoinRequest}>
          <div className="form-group">
            <label>Select Club</label>
            <select onChange={e => {
              const clubId = e.target.value
              if (!clubId) return setSelectedGroup('')
              setSelectedGroup('')
            }}>
              <option value="">Select club</option>
              {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Select Group</label>
            <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} required>
              <option value="">Select group</option>
              {clubs.flatMap(c => c.Groups || []).map(g => (
                <option key={g.id} value={g.id}>{g.name} ({clubs.find(c => c.id === g.clubId)?.name})</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={() => setJoinModal(false)}>Cancel</Button>
            <Button type="submit">Request to Join</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
