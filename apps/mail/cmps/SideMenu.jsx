const { Link } = ReactRouterDOM

export function SideMenu({ filterBy, onSetFilterBy }) {
  function handleFilterChange(txt) {
    onSetFilterBy({ txt })
  }

  return (
    <section className='side-menu '>
      <Link title='compose' to='/mail/compose' className='compose-btn'>
        <span className='material-symbols-outlined'>edit</span>
      </Link>

      <button title='inbox' className='btn inbox-btn' onClick={() => handleFilterChange('in:inbox')}>
        <span className='material-symbols-outlined'>inbox</span>
      </button>

      <button title='starred' className='btn starred-btn' onClick={() => handleFilterChange('is:starred')}>
        <span className='material-symbols-outlined'>star</span>
      </button>

      <button title='sent' className='btn sent-btn' onClick={() => handleFilterChange('in:sent')}>
        <span className='material-symbols-outlined'>send</span>
      </button>

      <button title='drafts' className='btn drafts-btn' onClick={() => handleFilterChange('in:drafts')}>
        <span className='material-symbols-outlined'>draft</span>
      </button>

      <button title='trash' className='btn trash-btn' onClick={() => handleFilterChange('in:trash')}>
        <span className='material-symbols-outlined'>delete</span>
      </button>
    </section>
  )
}
