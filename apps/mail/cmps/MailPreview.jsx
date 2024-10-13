import { LongText } from '../../../cmps/LongText.jsx'

const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStarred, onRemoveMail, onToggleRead }) {
  const navigate = useNavigate()
  const { createdAt, subject, body, isRead, sentAt, removedAt, from, to, isStarred, isDraft } = mail

  function convertTimestamp(timestamp) {
    const date = new Date(timestamp)
    const options = { day: 'numeric', month: 'long' }
    return date.toLocaleDateString(undefined, options)
  }

  function onClickPreview(ev) {
    ev.stopPropagation()

    if (isDraft) {
      navigate(`/mail/compose/${mail.id}`)
    } else {
      navigate(`/mail/${mail.id}`)
    }
  }

  const contactName = isDraft ? 'Draft' : from.split('@')[0]
  const isStarredDynamicClass = isStarred ? 'starred' : ''
  const isReadBtnIcon = isRead ? <span className="material-symbols-outlined">mail</span> : <span className="material-symbols-outlined">drafts</span>

  return (
    <li
      className={`mail-preview ${isRead ? 'read' : 'unread'} ${isDraft ? 'draft' : ''}`}
      onClick={onClickPreview}>
      <div className="btn star-btn">
        <span
          className={`star-icon ${isStarredDynamicClass}`}
          onClick={(ev) => onToggleStarred(ev, mail.id)}></span>
      </div>

      <div className="preview-sender">
        <span>{contactName}</span>
      </div>

      <div className="preview-content">
        <span className="preview-subject">
          <LongText limit={50}>{subject || '(No subject)'}</LongText>
        </span>
        -
        <span className="preview-body">
          <LongText limit={100}>{body}</LongText>
        </span>
      </div>
      <div>
        <div className="preview-date">{convertTimestamp(sentAt || createdAt)}</div>
      </div>

      <section className="preview-actions flex align center">
        <button
          onClick={(ev) => onRemoveMail(ev, mail.id)}
          className="btn remove-btn">
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button
          className="btn toggle-read-btn"
          onClick={(ev) => onToggleRead(ev, mail.id)}>
          {isReadBtnIcon}
        </button>
        {isDraft && <span className="draft-indicator">Draft</span>}
      </section>
    </li>
  )
}
