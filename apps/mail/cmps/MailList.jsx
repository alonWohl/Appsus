import { MailPreview } from './MailPreview.jsx'
import { MailSort } from './MailSort.jsx'

export function MailList({ mails, onToggleStarred, onRemoveMail, onToggleRead, onSetFilterBy, filterBy }) {
  return (
    <ul className="mail-list">
      <MailSort
        filterBy={filterBy}
        onSetFilterBy={onSetFilterBy}
      />
      {mails.map((mail) => (
        <MailPreview
          mail={mail}
          key={mail.id}
          onToggleStarred={onToggleStarred}
          onRemoveMail={onRemoveMail}
          onToggleRead={onToggleRead}
        />
      ))}
    </ul>
  )
}
