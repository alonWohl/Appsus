import { MailPreview } from './MailPreview.jsx'
import { MailSort } from './MailSort.jsx'

export function MailList() {
  const { useOutletContext, useParams } = ReactRouterDOM

  const { category } = useParams()

  const { mails, filterBy, onSetFilterBy, onToggleRead, onToggleStarred, onRemoveMail } = useOutletContext()
  return (
    <ul className="mail-list">
      <MailSort filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      {mails.map((mail) => (
        <MailPreview
          mail={mail}
          key={mail.id}
          onToggleStarred={onToggleStarred}
          onRemoveMail={onRemoveMail}
          category={category}
          onToggleRead={onToggleRead}
        />
      ))}
    </ul>
  )
}
