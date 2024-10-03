import { LongText } from '../../../cmps/LongText.jsx'

export function MailPreview({ mail, onToggleStarred }) {
  const { createdAt, subject, body, isRead, sentAt, removedAt, from, to } = mail

  const contactName = from.split('@')[0]

  function convertTimestamp(timestamp) {
    const date = new Date(timestamp)
    const options = { day: 'numeric', month: 'long' }
    return date.toLocaleDateString(undefined, options)
  }

  const starredStyle = mail.isStarred ? { fill: 'yellow', stroke: 'yellow' } : { fill: '#e8eaed', stroke: 'none' }

  return (
    <li className={`mail-preview ${isRead ? 'read' : 'unread'}`}>
      <article className='mail'>
        <div className='is-starred'>
          <button onClick={() => onToggleStarred(mail.id)} className='star-btn'>
            <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' style={starredStyle}>
              <path d='m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z' />
            </svg>
          </button>

          <h2 className='mail-contact'>{contactName}</h2>
        </div>

        <h3 className='mail-subject'>
          <LongText text={subject} limit={50} />
        </h3>

        <div className='mail-body'>
          <LongText text={body} limit={100} />
        </div>

        <div className='sent-at'>{convertTimestamp(sentAt)}</div>
      </article>
    </li>
  )
}
