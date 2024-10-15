const { Link } = ReactRouterDOM

export function NoteSideMenu({ filterBy, onSetFilterBy, notes, isExpand }) {
  function onSetFilter(filter) {
    onSetFilterBy(filter)
  }

  function isActive(status) {
    return filterBy === status ? 'active' : ''
  }

  const menuItems = [
    { category: '', icon: 'lightbulb', label: 'Notes', countKey: 'notes' },
    { category: 'reminders', icon: 'notifications', label: 'Reminders', countKey: 'reminders' },
    { category: 'personal', icon: 'label', label: 'Personal', countKey: 'personal' },
    { category: 'inspiration', icon: 'label', label: 'Inspiration', countKey: 'inspiration' },
    { category: 'work', icon: 'label', label: 'Work', countKey: 'work' },
    { category: 'archive', icon: 'archive', label: 'Archive', countKey: 'archive' },
    { category: 'bin', icon: 'delete', label: 'Bin', countKey: 'bin' }
  ]

  return (
    <aside className={`notes-sidebar ${isExpand ? 'expanded' : ''}`}>
      <ul className="notes-sidebar-links flex column">
        {menuItems.map(({ category, icon, label, countKey }) => (
          <li
            key={category}
            className={`note-link ${label.toLowerCase()}-link ${isActive(category)}`}
            onClick={() => onSetFilter(category)}>
            <span className="material-symbols-outlined note-link-icon">{icon}</span>
            <div className="hidden flex space-between menu-hidden-items">
              <span className="hidden">{label}</span>
              {/* {noteCounts[countKey]} */}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
