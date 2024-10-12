export function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Our App Suite</h1>

        <p className="about-paragraph">
          Welcome to our comprehensive productivity suite! We've combined the power of email management and note-taking into one seamless application.
        </p>

        <h2 className="about-subtitle">Our Features</h2>

        <div className="feature-grid">
          <FeatureCard
            icon={<MailIcon />}
            title="Gmail Clone"
            description="Manage your emails efficiently with our intuitive Gmail-inspired interface."
          />
          <FeatureCard
            icon={<NoteIcon />}
            title="Keep Clone"
            description="Capture your thoughts and stay organized with our powerful note-taking tool."
          />
        </div>

        <h2 className="about-subtitle">Technology Stack</h2>
        <p className="about-paragraph">
          Our application is built using cutting-edge web technologies to ensure a smooth and responsive user experience:
        </p>
        <ul className="about-list">
          <li>React for building our user interface</li>
          <li>React Router for navigation</li>
          <li>Custom CSS for styling</li>
          <li>Local Storage for data persistence</li>
        </ul>

        <h2 className="about-subtitle">Meet the Developers</h2>
        <div className="developers-grid">
          <DeveloperCard
            name="Alon Wohl"
            role="Full-stack Developer"
            description="Passionate about creating efficient and user-friendly applications."
          />
          <DeveloperCard
            name="Aviv Buzglo"
            role="Full-stack Developer"
            description="Dedicated to building robust and scalable web solutions."
          />
        </div>

        <div className="github-button-container">
          <a
            href="https://github.com/AlonWohl/Appsus"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button">
            <GithubIcon /> View on GitHub
          </a>
        </div>
      </div>

      <footer className="about-footer">
        <p>&copy; 2024 Your App Suite. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  )
}

function DeveloperCard({ name, role, description }) {
  return (
    <div className="developer-card">
      <h3 className="developer-name">{name}</h3>
      <p className="developer-role">{role}</p>
      <p className="developer-description">{description}</p>
    </div>
  )
}

function MailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
        stroke="#4338CA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
        stroke="#4338CA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="github-icon">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
