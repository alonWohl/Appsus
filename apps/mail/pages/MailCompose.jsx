import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function MailCompose() {
  const [mailToSend, setMailToSend] = useState(mailService.getEmptyMail())
  const navigate = useNavigate()

  useEffect(() => {
    const autoSaveDraft = setInterval(() => {
      saveDraft()
    }, 5000)

    return () => clearInterval(autoSaveDraft)
  }, [mailToSend])

  function saveDraft() {
    if (!mailToSend.to && !mailToSend.subject && !mailToSend.body) return
    const draftMail = { ...mailToSend, isDraft: true, sentAt: null }
    mailService
      .save(draftMail)
      .then(() => console.log('Draft saved'))
      .catch((err) => console.log('Error saving draft:', err))
  }

  function handleChange({ target }) {
    const field = target.name

    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setMailToSend((prevMail) => ({ ...prevMail, [field]: value }))
  }

  function onSendMail(ev) {
    ev.preventDefault()

    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/
    if (!emailRegex.test(mailToSend.to)) {
      showErrorMsg('Invalid email address')
      return
    }

    if (!mailToSend.subject) {
      showErrorMsg('Subject is required')
      return
    }

    mailService
      .save(mailToSend)
      .then(() => showSuccessMsg('Mail Sent Successfully'))
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Couldnt Send Mail')
      })
      .finally(() => {
        navigate('/mail')
      })
  }

  const fromAddress = mailService.loggedinUser.mail

  return (
    <form
      className="mail-compose"
      onSubmit={onSendMail}>
      <div className="compose-head">
        <h2>New Message</h2>
        <button
          onClick={() => navigate('/mail')}
          type="button"
          className="btn btn-cancel">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="from">From : {fromAddress}</div>

      <label htmlFor="to">
        To
        <input
          onChange={handleChange}
          type="text"
          name="to"
          id="to"
        />
      </label>

      <label htmlFor="subject">
        Subject
        <input
          onChange={handleChange}
          type="text"
          name="subject"
          id="subject"
        />
      </label>

      <textarea
        className="mail-compose-body"
        onChange={handleChange}
        name="body"
        id="body"></textarea>

      <button className="send-btn">send</button>
    </form>
  )
}
