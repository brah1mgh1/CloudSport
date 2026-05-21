import { useState } from 'react'
import { useMutate } from '../../hooks/useFetch'
import Button from '../../components/common/Button'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const { mutate, loading } = useMutate()
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await mutate('post', '/feedback', {
        name: form.name,
        email: form.email,
        message: `[${form.subject}] ${form.message}`,
        rating: 5
      })
      setSent(true)
    } catch {}
  }

  if (sent) {
    return (
      <div className="page-container" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <h2>Message Sent!</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8, marginBottom: 24 }}>
            Thank you for contacting us. We'll get back to you shortly.
          </p>
          <Button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
            Send Another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Contact Us</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
        Have a question, suggestion, or want to get involved? Drop us a message.
      </p>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 1fr', marginBottom: 32 }}>
        {[
          { label: 'Email', value: 'info@cloudsport.com' },
          { label: 'Phone', value: '+1 (555) 123-4567' },
          { label: 'Location', value: '123 Sports Complex Ave' },
          { label: 'Hours', value: 'Mon-Sat: 6AM - 10PM' }
        ].map((item, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 20 }}>Send a Message</h2>
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
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Membership Inquiry" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Tell us how we can help..." />
          </div>
          <Button type="submit" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  )
}
