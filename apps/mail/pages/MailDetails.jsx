import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { mailSevice } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails({ onRemoveMail }) {
  const [mail, setMail] = useState(null)
  const { mailId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    loadMail()
  }, [mailId])

  function loadMail() {
    mailSevice
      .get(mailId)
      .then((mail) => {
        if (!mail.isRead) {
          const updatedMail = { ...mail, isRead: true }
          mailSevice.save(updatedMail).then(() => {
            setMail(updatedMail)
          })
        } else {
          setMail(mail)
        }
      })
      .catch((err) => {
        showErrorMsg('Cannot Set Mail')
        console.log(err, 'cannot set mail')
        navigate('/mail')
      })
  }

  if (!mail) return <AppLoader />

  const { createdAt, subject, body, isRead, sentAt, removedAt, from, to } = mail
  const contactName = from.split('@')[0]

  return (
    <section className="mail-details">
      <div className="details-header">
        <h2>{subject}</h2>

        <section className="btn-group flex">
          <button
            className="btn back-btn"
            onClick={() => navigate('/mail')}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <button
            onClick={(ev) => onRemoveMail(ev, mail.id)}
            className="btn remove-btn">
            <span className="material-symbols-outlined link-icon">delete</span>
          </button>
        </section>
      </div>

      <div className="details-contact">
        <h3>{contactName}</h3>
        <span className="contact-address">{`<${from}>`}</span>
      </div>

      <div className="details-body">
        <p className="body-text">{body}</p>
      </div>
    </section>
  )
}
