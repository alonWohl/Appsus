const { Link, useSearchParams } = ReactRouterDOM

export function MailFolderList() {
  const [searchParams] = useSearchParams()

  function createSearchParams(newFilter) {
    searchParams.set('filter', newFilter)
    return `?${searchParams.toString()}`
  }

  return (
    <section className='side-menu'>
      <Link title='compose' to='/mail/compose' className='compose-btn'>
        <span className='material-symbols-outlined'>edit</span>
      </Link>

      <Link title='inbox' to={createSearchParams('in:inbox')} className='btn inbox-btn'>
        <span className='material-symbols-outlined'>inbox</span>
      </Link>

      <Link title='starred' to={createSearchParams('is:starred')} className='btn starred-btn'>
        <span className='material-symbols-outlined'>star</span>
      </Link>

      <Link title='sent' to={createSearchParams('in:sent')} className='btn sent-btn'>
        <span className='material-symbols-outlined'>send</span>
      </Link>

      <Link title='drafts' to={createSearchParams('in:drafts')} className='btn drafts-btn'>
        <span className='material-symbols-outlined'>draft</span>
      </Link>

      <Link title='trash' to={createSearchParams('in:trash')} className='btn trash-btn'>
        <span className='material-symbols-outlined'>delete</span>
      </Link>
    </section>
  )
}
