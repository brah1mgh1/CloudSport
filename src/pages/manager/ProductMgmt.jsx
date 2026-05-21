import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

const emptyProduct = { name: '', description: '', price: '', image: '', category: '', stock: '' }

export default function ProductMgmt() {
  const { data, loading, refetch } = useFetch('/products')
  const { mutate } = useMutate()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProduct)

  const products = data?.products || []

  const openCreate = () => { setForm(emptyProduct); setEditing(null); setModal(true) }
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) await mutate('put', `/products/${editing}`, form)
      else await mutate('post', '/products', form)
      setModal(false); refetch()
    } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try { await mutate('delete', `/products/${id}`) } catch (e) { console.error('Delete failed:', e) }
    refetch()
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Store Management</h1>
        <Button onClick={openCreate}>Add Product</Button>
      </div>

      <div className="grid grid-3">
        {products.map(p => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{p.description}</p>
            <div style={{ marginTop: 8, fontSize: 13 }}>
              <div style={{ color: 'var(--accent)' }}>Price: ${p.price}</div>
              <div>Stock: {p.stock}</div>
              <div>Category: {p.category || 'N/A'}</div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" onClick={() => openEdit(p)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Product' : 'Add Product'}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
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
