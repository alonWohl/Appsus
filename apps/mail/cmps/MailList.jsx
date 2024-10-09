import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onToggleStarred, onRemoveMail, onToggleRead }) {
  return (
    <ul className='mail-list'>
      {mails.map((mail) => (
        <MailPreview mail={mail} key={mail.id} onToggleStarred={onToggleStarred} onRemoveMail={onRemoveMail} onToggleRead={onToggleRead} />
      ))}
    </ul>
  )
}
