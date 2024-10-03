import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onToggleStarred }) {
  return (
    <ul className='mail-list'>
      {mails.map((mail) => (
        <MailPreview mail={mail} key={mail.id} onToggleStarred={onToggleStarred} />
      ))}
    </ul>
  )
}
