import { MailFilter } from './MailFilter.jsx'

export function MailHeader({ filterBy, onSetFilterBy, onToggleHamburger, isExpand, onBack }) {
  return (
    <header className="mail-header flex align-center ">
      <section className="logo-hamburger">
        <button
          onClick={onToggleHamburger}
          aria-expanded={isExpand}
          className="btn hamburger">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div
          className="logo"
          onClick={onBack}>
          <img
            src="./assets/img/mail-logo.png"
            alt="logo"
          />
        </div>
      </section>

      <MailFilter
        filterBy={filterBy}
        onSetFilterBy={onSetFilterBy}
      />
    </header>
  )
}
