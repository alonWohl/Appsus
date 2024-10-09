const { Link } = ReactRouterDOM

export function SideMenu({ filterBy, onSetFilterBy }) {
  function handleFilterChange(txt) {
    onSetFilterBy({ txt })
  }

  function isActive(txt) {
    return filterBy.txt === txt ? 'active' : ''
  }

  return (
    <section className='side-menu'>
      <Link title='compose' to='/mail/compose' className='compose-btn-wrapper'>
        <button className='btn compose-btn'>
          <span className='material-symbols-outlined'>edit</span>
        </button>
        <span className='hidden'>Compose</span>
      </Link>

      <div className={`btn-wrapper ${isActive('in:inbox')}`} onClick={() => handleFilterChange('in:inbox')}>
        <button title='inbox' className='btn inbox-btn'>
          <span className='material-symbols-outlined'>inbox</span>
        </button>
        <span className='hidden'>Inbox</span>
      </div>

      <div className={`btn-wrapper ${isActive('is:starred')}`} onClick={() => handleFilterChange('is:starred')}>
        <button title='starred' className='btn starred-btn'>
          <span className='material-symbols-outlined'>star</span>
        </button>
        <span className='hidden'>Starred</span>
      </div>

      <div className={`btn-wrapper ${isActive('in:sent')}`} onClick={() => handleFilterChange('in:sent')}>
        <button title='sent' className='btn sent-btn'>
          <span className='material-symbols-outlined'>send</span>
        </button>
        <span className='hidden'>Sent</span>
      </div>

      <div className={`btn-wrapper ${isActive('in:drafts')}`} onClick={() => handleFilterChange('in:drafts')}>
        <button title='drafts' className='btn drafts-btn'>
          <span className='material-symbols-outlined'>draft</span>
        </button>
        <span className='hidden'>Drafts</span>
      </div>

      <div className={`btn-wrapper ${isActive('in:trash')}`} onClick={() => handleFilterChange('in:trash')}>
        <button title='trash' className='btn trash-btn'>
          <span className='material-symbols-outlined'>delete</span>
        </button>
        <span className='hidden'>Trash</span>
      </div>
    </section>
  )
}
