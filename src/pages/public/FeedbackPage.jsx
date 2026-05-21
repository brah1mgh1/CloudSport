import { useState } from 'react'
import { useMutate } from '../../hooks/useFetch'
import Button from '../../components/common/Button'

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 })
  const { mutate, loading } = useMutate()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await mutate('post', '/feedback', form)
      setSubmitted(true)
    } catch {}
  }

  if (submitted) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <h2>Thank You!</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Your feedback has been submitted successfully.</p>
          <Button style={{ marginTop: 16 }} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '', rating: 5 }) }}>
            Submit Another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, textAlign: 'center' }}>Leave Feedback</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 24 }}>
        We value your opinion. Let us know how we're doing!
      </p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Email (optional)</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <div style={{ display: 'flex', gap: 4, fontSize: 24 }}>
              {[1,2,3,4,5].map(n => (
                <span key={n} onClick={() => setForm({ ...form, rating: n })} style={{ cursor: 'pointer', color: n <= form.rating ? 'var(--warning)' : 'var(--border)' }}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Share your experience..." />
          </div>
          <Button type="submit" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
    </div>
  )
}
