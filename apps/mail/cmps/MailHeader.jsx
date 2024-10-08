import { MailFilter } from './MailFilter.jsx'

export function MailHeader({ filterBy, onSetFilterBy }) {
  return (
    <header className='mail-header flex align-center space-between'>
      <section className='logo-hamburger'>
        <button className='btn hamburger'>
          <span className='material-symbols-outlined'>menu</span>
        </button>
        <div className='logo'>
          <img src='./assets/img/mail-logo.png' alt='logo' />
        </div>
      </section>

      <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
    </header>
  )
}
