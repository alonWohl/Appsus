import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailSevice } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function MailCompose() {
  const [mailToSend, setMailToSend] = useState(mailSevice.getEmptyMail())
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
    mailSevice
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
    mailSevice
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

  const fromAddress = mailSevice.loggedinUser.mail

  return (
    <form className='mail-compose' onSubmit={onSendMail}>
      <div className='compose-head'>
        <h2>New Message</h2>
        <button onClick={() => navigate('/mail')} type='button' className='btn btn-cancel'>
          <span className='material-symbols-outlined'>close</span>
        </button>
      </div>
      <div className='from'>From : {fromAddress}</div>

      <label htmlFor='to'>To</label>
      <input onChange={handleChange} type='text' name='to' id='to' />

      <label htmlFor='subject'>subject</label>
      <input onChange={handleChange} type='text' name='subject' id='subject' />

      <textarea onChange={handleChange} name='body' id='body'></textarea>

      <button className='send-btn'>send</button>
    </form>
  )
}
