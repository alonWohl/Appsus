import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, useOutletContext } = ReactRouterDOM

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const { onRemoveMail, onToggleRead, onBack } = useOutletContext()

  const { mailId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadMail()
  }, [mailId])

  function loadMail() {
    mailService
      .get(mailId)
      .then((mail) => {
        setMail(mail)
        if (!mail.isRead) {
          setMail((prevMail) => ({ ...prevMail, isRead: true }))
          return mailService.save({ ...mail, isRead: true })
        }
      })
      .catch((err) => {
        console.error('Cannot load mail:', err)
        showErrorMsg('Cannot load mail')
        navigate('/mail')
      })
  }

  if (!mail) return <AppLoader />

  const { subject, body, from } = mail
  const contactName = from.split('@')[0]

  return (
    <section className="mail-details">
      <div className="details-header">
        <h2>{subject}</h2>

        <section className="btn-group flex">
          <button className="btn back-btn" onClick={() => onBack()}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <button onClick={(ev) => onRemoveMail(ev, mail.id)} className="btn remove-btn">
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
