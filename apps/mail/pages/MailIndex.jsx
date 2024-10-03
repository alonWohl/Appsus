import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailSevice } from '../services/mail.service.js'

const { useState, useEffect } = React
export function MailIndex() {
  const [mails, setMails] = useState([])
  // const [isStarred, setIsStarred] = useState(null)

  useEffect(() => {
    mailSevice
      .query()
      .then(setMails)
      .catch((err) => {
        console.log(err, 'Cant Get Mails')
      })
  }, [])

  function onToggleStarred(mailId) {
    mailSevice.get(mailId).then((mail) => {
      const updatedMail = { ...mail, isStarred: !mail.isStarred }
      mailSevice
        .save(updatedMail)
        .then(() => {
          setMails((prevMails) => [...prevMails.map((m) => (m.id === mailId ? updatedMail : m))].sort((a, b) => b.isStarred - a.isStarred))
        })
        .catch((err) => {
          console.error('Failed to update mail:', err)
        })
    })
  }

  if (!mails) return <AppLoader />

  return (
    <section className='mail-index'>
      <MailList mails={mails} onToggleStarred={onToggleStarred} />
    </section>
  )
}
