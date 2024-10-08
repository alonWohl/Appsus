import { LongText } from '../../../cmps/LongText.jsx'

const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStarred, onRemoveMail, onToggleRead }) {
  const navigate = useNavigate()
  const { createdAt, subject, body, isRead, sentAt, removedAt, from, to, isStarred } = mail

  function convertTimestamp(timestamp) {
    const date = new Date(timestamp)
    const options = { day: 'numeric', month: 'long' }
    return date.toLocaleDateString(undefined, options)
  }

  const contactName = from.split('@')[0]
  const isStarredDynamicClass = isStarred ? 'starred' : ''
  const isReadBtnIcon = isRead ? <span className='material-symbols-outlined'>mail</span> : <span className='material-symbols-outlined'>drafts</span>

  return (
    <li className={`mail-preview ${isRead ? 'read' : 'unread'}`}>
      <button className='btn star-btn' onClick={() => onToggleStarred(mail.id)}>
        <span title={isStarred ? 'Starred' : 'Not Starred'} className={`material-symbols-outlined ${isStarredDynamicClass}`}>
          star
        </span>
      </button>

      <article onClick={() => navigate(`/mail/${mail.id}`)} className='preview-content'>
        <span className='preview-sender'>{contactName}</span>
        <span className='preview-subject'>
          <LongText limit={50}>{subject}</LongText>
        </span>
        -
        <p className='preview-body'>
          <LongText limit={100}>{body}</LongText>
        </p>
        <div className='preview-date'>{convertTimestamp(sentAt)}</div>
      </article>

      <section className='preview-actions flex align center'>
        <button onClick={() => onRemoveMail(mail.id)} className='btn remove-btn'>
          <span className='material-symbols-outlined'>delete</span>
        </button>
        <button className='btn toggle-read-btn' onClick={() => onToggleRead(mail.id)}>
          {isReadBtnIcon}
        </button>
      </section>
    </li>
  )
}
