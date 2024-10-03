import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { mailSevice } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
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
        console.log(err, 'cannot set mail')
      })
  }

  if (!mail) return <AppLoader />

  const { createdAt, subject, body, isRead, sentAt, removedAt, from, to } = mail
  const contactName = from.split('@')[0]

  return (
    <section className='mail-details'>
      <div className='details-header'>
        <h2>{subject}</h2>

        <section className='btn-group'>
          <button className='btn back-btn' onClick={() => navigate('/mail')}>
            <svg height='24px' viewBox='0 -960 960 960' width='24px' fill='#e8eaed'>
              <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
            </svg>
          </button>
        </section>
      </div>

      <div className='details-contact'>
        <h3>{contactName}</h3>
        <span className='contact-address'>{`<${from}>`}</span>
      </div>

      <div className='details-body'>
        <p className='body-text'>{body}</p>
      </div>
    </section>
  )
}
