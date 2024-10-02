import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails }) {
  return (
    <ul className='mail-list'>
      {mails.map((mail) => (
        <MailPreview mail={mail} key={mail.id} />
      ))}
    </ul>
  )
}
