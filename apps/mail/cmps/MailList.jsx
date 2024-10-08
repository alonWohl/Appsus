import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onToggleStarred, onRemoveMail, onToggleRead }) {
  return (
    <section className='mail-list-container'>
      <ul className='mail-list'>
        {mails.map((mail) => (
          <MailPreview mail={mail} key={mail.id} onToggleStarred={onToggleStarred} onRemoveMail={onRemoveMail} onToggleRead={onToggleRead} />
        ))}
      </ul>
    </section>
  )
}
