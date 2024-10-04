const { Link } = ReactRouterDOM

export function SideMenu({ filterBy, onSetFilterBy }) {
  function handleFilterChange(txt) {
    onSetFilterBy({ txt })
  }

  return (
    <section className='side-menu '>
      <Link to='/mail/compose' className='compose-btn'>
        <span className='material-symbols-outlined'>edit</span>
      </Link>

      <button className='btn inbox-btn' onClick={() => handleFilterChange('')}>
        <span className='material-symbols-outlined'>inbox</span>
      </button>

      <button className='btn starred-btn' onClick={() => handleFilterChange('is:starred')}>
        <span className='material-symbols-outlined'>star</span>
      </button>

      <button className='btn sent-btn' onClick={() => handleFilterChange('in:sent')}>
        <span className='material-symbols-outlined'>send</span>
      </button>

      <button className='btn drafts-btn' onClick={() => handleFilterChange('in:drafts')}>
        <span className='material-symbols-outlined'>draft</span>
      </button>

      <button className='btn trash-btn' onClick={() => handleFilterChange('in:trash')}>
        <span className='material-symbols-outlined'>delete</span>
      </button>
    </section>
  )
}
