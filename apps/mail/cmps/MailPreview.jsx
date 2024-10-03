import { LongText } from '../../../cmps/LongText.jsx'

const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStarred }) {
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
        <svg className={isStarredDynamicClass} height='24px' viewBox='0 -960 960 960' width='24px'>
          <path d='m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z' />
        </svg>
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
    </li>
  )
}
