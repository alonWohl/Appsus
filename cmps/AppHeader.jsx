const { useState } = React
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <Link
          to="/"
          className="logo-link">
          <h3 className="logo">Appsus</h3>
        </Link>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu">
          <span className="menu-icon"></span>
        </button>
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink
            to="/mail"
            onClick={toggleMenu}>
            Mail
          </NavLink>
          <NavLink
            to="/note"
            onClick={toggleMenu}>
            Note
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
