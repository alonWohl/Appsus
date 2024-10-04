export function MailHeader({ children }) {
  return (
    <header className='mail-header flex align-center'>
      <button className='btn hamburger'>
        <span className='material-symbols-outlined'>menu</span>
      </button>
      <div className='logo'>
        <img src='/assets/img/mail-logo.png' alt='logo' />
      </div>
      {children}
    </header>
  )
}
