export default function PolicyPage() {
  const policies = [
    {
      title: 'Code of Conduct',
      content: 'All members, staff, and visitors must conduct themselves with respect, fairness, and sportsmanship. Any form of discrimination, harassment, or violence will result in immediate suspension and possible termination of membership.'
    },
    {
      title: 'Facility Booking Policy',
      content: 'Facilities may be booked up to 30 days in advance. Reservations require approval from facility management. Cancellations must be made at least 24 hours before the scheduled time to avoid charges. Repeated no-shows may result in booking restrictions.'
    },
    {
      title: 'Membership Terms',
      content: 'Memberships are available on an annual or seasonal basis. All members must provide accurate personal information. Membership fees are non-refundable unless otherwise stated. Members are responsible for the safety of their personal belongings.'
    },
    {
      title: 'Privacy Policy',
      content: 'CloudSport respects your privacy. Personal data collected during registration and use of our services is stored securely and used only for operational purposes. We do not share your information with third parties without your explicit consent.'
    },
    {
      title: 'Payment Policy',
      content: 'All payments are processed securely through our payment gateway. Facility booking fees must be paid within 48 hours of approval. Membership fees are due at the time of registration. Refunds are processed within 5-10 business days.'
    },
    {
      title: 'Event Participation Policy',
      content: 'Participants in events and tournaments must register in advance and agree to event-specific rules. The sports complex is not liable for injuries sustained during activities. All participants are encouraged to have personal insurance coverage.'
    }
  ]

  return (
    <div className="page-container" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Policies</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
        Our commitment to providing a safe, fair, and enjoyable environment for everyone.
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        {policies.map((p, i) => (
          <div key={i} className="card" style={{ borderLeft: '4px solid var(--accent)', padding: 28 }}>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>{p.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>{p.content}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 32, textAlign: 'center', padding: 32 }}>
        <h2 style={{ marginBottom: 8 }}>Questions About Our Policies?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Contact us for more information about any of our policies.</p>
        <a href="/contact" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Contact Us</a>
      </div>
    </div>
  )
}
