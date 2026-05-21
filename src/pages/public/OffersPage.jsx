import { useFetch } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'

export default function OffersPage() {
  const { data, loading } = useFetch('/offers/active')
  const offers = data?.offers || []

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 8, textAlign: 'center' }}>Current Offers</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 24 }}>
        Check out our latest deals and promotions!
      </p>

      {offers.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No Active Offers</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Check back later for new promotions.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {offers.map(o => (
            <div key={o.id} className="card" style={{ borderTop: '4px solid var(--warning)' }}>
              <h2 style={{ color: 'var(--accent)' }}>{o.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>{o.description}</p>
              <div style={{
                marginTop: 16, fontSize: 24, fontWeight: 700, color: 'var(--warning)'
              }}>
                {o.discountPercentage}% OFF
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                Valid: {formatDate(o.validFrom)} - {formatDate(o.validUntil)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
