const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function SideMenu({ filterBy, onSetFilterBy, isExpand }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const navigate = useNavigate()

  useEffect(() => {
    setFilterByToEdit({ ...filterBy })
  }, [filterBy])

  function handleFilterClick(txt) {
    const updatedFilter = { ...filterByToEdit, txt }
    setFilterByToEdit(updatedFilter)
    onSetFilterBy(updatedFilter)
    navigate('/mail')
  }

  function isActive(txt) {
    return filterByToEdit.txt === txt ? 'active' : ''
  }

  return (
    <aside className={`sidebar ${isExpand ? 'expanded' : ''}`}>
      <ul className="sidebar-links flex column">
        <div className="compose-wrapper">
          <Link
            className="link compose-link"
            title="compose"
            to="/mail/compose">
            <span
              style={{ width: '56px', justifyContent: 'center' }}
              className="material-symbols-outlined flex align-center">
              edit
            </span>
            <span className="hidden">Compose</span>
          </Link>
        </div>

        <li
          className={`link inbox-link ${isActive('')}`}
          onClick={() => handleFilterClick('')}>
          <span className="material-symbols-outlined link-icon avtive">inbox</span>
          <span className="hidden">Inbox</span>
        </li>

        <li
          className={`link starred-link ${isActive('is:starred')}`}
          onClick={() => handleFilterClick('is:starred')}>
          <span className="material-symbols-outlined link-icon">star</span>
          <span className="hidden">Starred</span>
        </li>

        <li
          className={`link sent-link ${isActive('in:sent')}`}
          onClick={() => handleFilterClick('in:sent')}>
          <span className="material-symbols-outlined link-icon">send</span>
          <span className="hidden">Sent</span>
        </li>

        <li
          className={`link drafts-link ${isActive('in:drafts')}`}
          onClick={() => handleFilterClick('in:drafts')}>
          <span className="material-symbols-outlined link-icon">draft</span>
          <span className="hidden">Drafts</span>
        </li>

        <li
          className={`link trash-link ${isActive('in:trash')}`}
          onClick={() => handleFilterClick('in:trash')}>
          <span className="material-symbols-outlined link-icon">delete</span>
          <span className="hidden">Trash</span>
        </li>
      </ul>
    </aside>
  )
}
