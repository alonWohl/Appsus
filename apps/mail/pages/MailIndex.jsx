import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailSevice } from '../services/mail.service.js'

const { useState, useEffect } = React
export function MailIndex() {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    mailSevice
      .query()
      .then(setMails)
      .catch((err) => {
        console.log(err, 'Cant Get Mails')
      })
  }, [])

  if (!mails) return <AppLoader />

  return (
    <section className='mail-index'>
      <MailList mails={mails} />
    </section>
  )
}
