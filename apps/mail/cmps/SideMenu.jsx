export function SideMenu({ filterBy, onSetFilterBy, isExpand, onComposeClick, unreadCounts = {} }) {
  function handleFilterClick(status) {
    const statusToTxtMap = {
      inbox: 'in:inbox',
      starred: 'is:starred',
      sent: 'in:sent',
      drafts: 'in:drafts',
      trash: 'in:trash'
    }

    onSetFilterBy({
      status,
      txt: statusToTxtMap[status] || ''
    })
  }

  function isActive(status) {
    return filterBy.status === status ? 'active' : ''
  }

  const menuItems = [
    { status: 'inbox', icon: 'inbox', label: 'Inbox', countKey: 'inbox' },
    { status: 'starred', icon: 'star', label: 'Starred', countKey: 'starred' },
    { status: 'sent', icon: 'send', label: 'Sent', countKey: 'sent' },
    { status: 'drafts', icon: 'draft', label: 'Drafts', countKey: 'drafts' },
    { status: 'trash', icon: 'delete', label: 'Trash', countKey: 'trash' }
  ]

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

        {menuItems.map(({ status, icon, label, countKey }) => (
          <li key={status} className={`link ${label.toLowerCase()}-link ${isActive(status)}`} onClick={() => handleFilterClick(status)}>
            <span className="material-symbols-outlined link-icon">{icon}</span>
            <div className="hidden flex space-between menu-hidden-items" aria-label={`${unreadCounts[countKey] || 0} unread`}>
              <span className="hidden">{label}</span>
              {unreadCounts[countKey] || 0}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
