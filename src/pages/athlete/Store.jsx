import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

export default function AthleteStore() {
  const { data, loading } = useFetch('/products')
  const { mutate } = useMutate()
  const [orderModal, setOrderModal] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const products = data?.products || []

  const placeOrder = async (productId) => {
    try {
      await mutate('post', '/products/order', { productId, quantity, paymentMethod: 'card' })
      setOrderModal(null)
      setQuantity(1)
      alert('Order placed successfully!')
    } catch {}
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 20 }}>Store</h1>

      <div className="grid grid-3">
        {products.filter(p => p.stock > 0).map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              height: 140, background: 'var(--light-gray)', borderRadius: 4, marginBottom: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'
            }}>
              {p.image ? <img src={p.image} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} /> : 'No Image'}
            </div>
            <h3>{p.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, flex: 1 }}>{p.description}</p>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent)' }}>${p.price}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>In stock: {p.stock}</div>
            </div>
            <Button size="sm" style={{ marginTop: 12 }} onClick={() => setOrderModal(p.id)}>Buy Now</Button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!orderModal} onClose={() => setOrderModal(null)} title="Place Order">
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" min={1} value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setOrderModal(null)}>Cancel</Button>
          <Button onClick={() => placeOrder(orderModal)}>Place Order</Button>
        </div>
      </Modal>
    </div>
  )
}
