import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onToggleStarred, onRemoveMail }) {
  return (
    <ul className='mail-list'>
      {mails.map((mail) => (
        <MailPreview mail={mail} key={mail.id} onToggleStarred={onToggleStarred} onRemoveMail={onRemoveMail} />
      ))}
    </ul>
  )
}
