const { NavLink, useNavigate } = ReactRouterDOM

export function SideMenu({ isExpand, onComposeClick, unreadCounts = {}, onSetFilterBy }) {
  const navigate = useNavigate()

  const menuItems = [
    { status: 'inbox', icon: 'inbox', label: 'Inbox', countKey: 'inbox', filterTxt: 'in:inbox' },
    { status: 'starred', icon: 'star', label: 'Starred', countKey: 'starred', filterTxt: 'is:starred' },
    { status: 'sent', icon: 'send', label: 'Sent', countKey: 'sent', filterTxt: 'in:sent' },
    { status: 'drafts', icon: 'draft', label: 'Drafts', countKey: 'drafts', filterTxt: 'in:drafts' },
    { status: 'trash', icon: 'delete', label: 'Trash', countKey: 'trash', filterTxt: 'in:trash' }
  ]

  function handleFilterClick(status, filterTxt) {
    onSetFilterBy({ status, txt: filterTxt })
    navigate(`/mail/${status}`)
  }

  return (
    <aside className={`sidebar ${isExpand ? 'expanded' : ''}`}>
      <ul className="sidebar-links flex column">
        <div className="compose-wrapper">
          <button className="link compose-link" title="compose" onClick={onComposeClick}>
            <span style={{ width: '56px', justifyContent: 'center' }} className="material-symbols-outlined flex align-center">
              edit
            </span>
            <span className="hidden">Compose</span>
          </button>
        </div>

        {menuItems.map(({ status, icon, label, countKey, filterTxt }) => (
          <li key={status}>
            <NavLink
              to={`/mail/${status}`}
              className={({ isActive }) => `link ${label.toLowerCase()}-link ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleFilterClick(status, filterTxt)
              }}>
              <span className="material-symbols-outlined link-icon">{icon}</span>
              <div className="hidden flex space-between menu-hidden-items" aria-label={`${unreadCounts[countKey] || 0} unread`}>
                <span className="hidden">{label}</span>
                {unreadCounts[countKey] || 0}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
