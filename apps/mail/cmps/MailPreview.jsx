import { LongText } from '../../../cmps/LongText.jsx'

const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStarred, onRemoveMail }) {
  const navigate = useNavigate()

  const { createdAt, subject, body, isRead, sentAt, removedAt, from, to } = mail

  function convertTimestamp(timestamp) {
    const date = new Date(timestamp)
    const options = { day: 'numeric', month: 'long' }
    return date.toLocaleDateString(undefined, options)
  }

  const contactName = from.split('@')[0]
  const isStarredDynamicClass = mail.isStarred ? 'starred' : ''

  return (
    <li className={`mail-preview ${isRead ? 'read' : 'unread'}`}>
      <button className='btn star-btn' onClick={() => onToggleStarred(mail.id)}>
        <span className={`material-symbols-outlined ${isStarredDynamicClass}`}>star</span>
      </button>

      <article onClick={() => navigate(`/mail/${mail.id}`)} className='mail-content'>
        <span className='mail-sender'>{contactName}</span>

        <div className='inner-content'>
          <span className='mail-subject'>
            <LongText limit={50}>{subject}</LongText>
          </span>

          <p className='mail-body'>
            <LongText limit={100}>{body}</LongText>
          </p>
        </div>

        <div className='mail-date'>{convertTimestamp(sentAt)}</div>
      </article>

      <section className='mail-action'>
        <button onClick={() => onRemoveMail(mail.id)} className='btn remove-btn'>
          <span className='material-symbols-outlined'>delete</span>
        </button>
      </section>
    </li>
  )
}
