export default function About() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: 24 }}>About CloudSport</h1>

      <div className="card">
        <h2>Our Mission</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
          CloudSport is a comprehensive sports complex management platform designed to streamline
          operations for sports facilities, clubs, and athletes. We provide tools for facility booking,
          club management, event organization, and more.
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>For Managers</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            Full control over facilities, users, clubs, reservations, and feedback.
            Manage your sports complex efficiently.
          </p>
        </div>
        <div className="card">
          <h3>For Club Leaders</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            Create and manage groups, book facilities, approve member requests,
            and organize events for your club.
          </p>
        </div>
        <div className="card">
          <h3>For Athletes</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            Join groups, view schedules, receive notifications, and shop at the store.
            Stay connected with your club.
          </p>
        </div>
        <div className="card">
          <h3>For Everyone</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            Browse the website, check offers, and leave feedback. Anyone can participate
            in the sports community.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20, textAlign: 'center' }}>
        <h2>Contact Us</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
          Email: info@cloudsport.com<br />
          Phone: +1 (555) 123-4567<br />
          Location: 123 Sports Complex Ave, Sports City
        </p>
      </div>
    </div>
  )
}
