const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function SideMenu({ filterBy, onSetFilterBy, isExpand, unreadCounts = {} }) {
  const navigate = useNavigate()

  function handleFilterClick(status) {
    onSetFilterBy({ ...filterBy, txt: status })
    navigate('/mail')
  }

  function isActive(status) {
    return filterBy.txt === status ? 'active' : ''
  }

  const menuItems = [
    { status: 'in:inbox', icon: 'inbox', label: 'Inbox', countKey: 'inbox' },
    { status: 'is:starred', icon: 'star', label: 'Starred', countKey: 'starred' },
    { status: 'in:sent', icon: 'send', label: 'Sent', countKey: 'sent' },
    { status: 'in:drafts', icon: 'draft', label: 'Drafts', countKey: 'drafts' },
    { status: 'in:trash', icon: 'delete', label: 'Trash', countKey: 'trash' }
  ]

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

        {menuItems.map(({ status, icon, label, countKey }) => (
          <li
            key={status}
            className={`link ${label.toLowerCase()}-link ${isActive(status)}`}
            onClick={() => handleFilterClick(status)}>
            <span className="material-symbols-outlined link-icon">{icon}</span>
            <div
              className="hidden flex space-between menu-hidden-items"
              aria-label={`${unreadCounts[countKey]} unread`}>
              <span className="hidden">{label}</span>
              {unreadCounts[countKey]}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
