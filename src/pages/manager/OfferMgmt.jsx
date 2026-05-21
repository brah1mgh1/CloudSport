import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

const emptyOffer = { title: '', description: '', discountPercentage: '', validFrom: '', validUntil: '', active: true }

export default function OfferMgmt() {
  const { data, loading, refetch } = useFetch('/offers')
  const { mutate } = useMutate()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyOffer)

  const offers = data?.offers || []

  const openCreate = () => { setForm(emptyOffer); setEditing(null); setModal(true) }
  const openEdit = (o) => { setForm({ ...o }); setEditing(o.id); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) await mutate('put', `/offers/${editing}`, form)
      else await mutate('post', '/offers', form)
      setModal(false); refetch()
    } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this offer?')) return
    try { await mutate('delete', `/offers/${id}`) } catch (e) { console.error('Delete failed:', e) }
    refetch()
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Offers</h1>
        <Button onClick={openCreate}>Add Offer</Button>
      </div>

      <div className="grid grid-2">
        {offers.map(o => (
          <div key={o.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{o.title}</h3>
              <span className={`badge ${o.active ? 'badge-approved' : 'badge-denied'}`}>
                {o.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{o.description}</p>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <div>Discount: {o.discountPercentage}%</div>
              <div>Valid: {formatDate(o.validFrom)} - {formatDate(o.validUntil)}</div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" onClick={() => openEdit(o)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(o.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Offer' : 'Add Offer'}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Discount (%)</label>
              <input type="number" value={form.discountPercentage} onChange={e => setForm({ ...form, discountPercentage: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Valid From</label>
              <input type="date" value={form.validFrom} onChange={e => setForm({ ...form, validFrom: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Valid Until</label>
              <input type="date" value={form.validUntil} onChange={e => setForm({ ...form, validUntil: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
              {' Active'}
            </label>
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
