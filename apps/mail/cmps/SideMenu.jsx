const { Link, useNavigate } = ReactRouterDOM

export function SideMenu({ filterBy, onSetFilterBy, isExpand }) {
  const navigate = useNavigate()

  function handleFilterChange(txt) {
    onSetFilterBy({ txt })
    navigate('/mail')
  }

  function isActive(txt) {
    return filterBy.txt === txt ? 'active' : ''
  }

  return (
    <aside className={`sidebar ${isExpand ? 'expanded' : ''}`}>
      <ul className='sidebar-links flex column'>
        <div className='compose-wrapper'>
          <Link className='link compose-link' title='compose' to='/mail/compose'>
            <span style={{ width: '56px', justifyContent: 'center' }} className='material-symbols-outlined flex align-center'>
              edit
            </span>
            <span className='hidden'>Compose</span>
          </Link>
        </div>

        <li className={`link inbox-link ${isActive('in:inbox')}`} onClick={() => handleFilterChange('in:inbox')}>
          <span className='material-symbols-outlined link-icon avtive'>inbox</span>
          <span className='hidden'>Inbox</span>
        </li>

        <li className={`link starred-link ${isActive('is:starred')}`} onClick={() => handleFilterChange('is:starred')}>
          <span className='material-symbols-outlined link-icon'>star</span>
          <span className='hidden'>Starred</span>
        </li>

        <li className={`link sent-link ${isActive('in:sent')}`} onClick={() => handleFilterChange('in:sent')}>
          <span className='material-symbols-outlined link-icon'>send</span>
          <span className='hidden'>Sent</span>
        </li>

        <li className={`link drafts-link ${isActive('in:drafts')}`} onClick={() => handleFilterChange('in:drafts')}>
          <span className='material-symbols-outlined link-icon'>draft</span>
          <span className='hidden'>Drafts</span>
        </li>

        <li className={`link trash-link ${isActive('in:trash')}`} onClick={() => handleFilterChange('in:trash')}>
          <span className='material-symbols-outlined link-icon'>delete</span>
          <span className='hidden'>Trash</span>
        </li>
      </ul>
    </aside>

    // <section className='side-menu'>
    //   <div className='btn-group'>
    //     <div className='compose-btn'>
    //       <Link title='compose' to='/mail/compose'>
    //         <div className='flex align-items center'>
    //           <span className='material-symbols-outlined'>edit</span>
    //           <span className='hidden'>Compose</span>
    //         </div>
    //       </Link>
    //     </div>

    //     <div className={`btn-wrapper ${isActive('in:inbox')}`} onClick={() => handleFilterChange('in:inbox')}>
    //       <button title='inbox' className='btn inbox-btn'>
    //         <span className='material-symbols-outlined'>inbox</span>
    //       </button>
    //       <span className='hidden'>Inbox</span>
    //     </div>
    //   </div>

    //   <div className={`btn-wrapper ${isActive('is:starred')}`} onClick={() => handleFilterChange('is:starred')}>
    //     <button title='starred' className='btn starred-btn'>
    //       <span className='material-symbols-outlined'>star</span>
    //     </button>
    //     <span className='hidden'>Starred</span>
    //   </div>

    //   <div className={`btn-wrapper ${isActive('in:sent')}`} onClick={() => handleFilterChange('in:sent')}>
    //     <button title='sent' className='btn sent-btn'>
    //       <span className='material-symbols-outlined'>send</span>
    //     </button>
    //     <span className='hidden'>Sent</span>
    //   </div>

    //   <div className={`btn-wrapper ${isActive('in:drafts')}`} onClick={() => handleFilterChange('in:drafts')}>
    //     <button title='drafts' className='btn drafts-btn'>
    //       <span className='material-symbols-outlined'>draft</span>
    //     </button>
    //     <span className='hidden'>Drafts</span>
    //   </div>

    //   <div className={`btn-wrapper ${isActive('in:trash')}`} onClick={() => handleFilterChange('in:trash')}>
    //     <button title='trash' className='btn trash-btn'>
    //       <span className='material-symbols-outlined'>delete</span>
    //     </button>
    //     <span className='hidden'>Trash</span>
    //   </div>
    // </section>
  )
}
