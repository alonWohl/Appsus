const { Link } = ReactRouterDOM

export function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Your Productivity Suite</h1>
        <p className="home-subtitle">Manage your emails and notes in one place</p>
      </header>

      <main className="home-main">
        <section className="feature-section">
          <div className="feature-card">
            <h2 className="feature-title">Gmail Clone</h2>
            <p className="feature-description">Efficiently manage your emails with our intuitive interface.</p>
            <Link
              to="/mail"
              className="feature-button">
              Open Mail
              <span className="arrow-icon">→</span>
            </Link>
          </div>

          <div className="feature-card">
            <h2 className="feature-title">Keep Clone</h2>
            <p className="feature-description">Capture and organize your thoughts with our powerful note-taking tool.</p>
            <Link
              to="/keep"
              className="feature-button">
              Open Notes
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-title">Start Boosting Your Productivity Today</h2>
          <p className="cta-description">Experience the power of integrated email and note management.</p>
          <Link
            to="/about"
            className="cta-button">
            Learn More
          </Link>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2024 Your Productivity Suite. All rights reserved.</p>
      </footer>
    </div>
  )
}
