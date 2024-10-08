import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { SideMenu } from '../cmps/SideMenu.jsx'
import { mailSevice } from '../services/mail.service.js'

const { useState, useEffect } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [searchPrms, setSearchPrms] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailSevice.getFilterFromSearchParams(searchPrms))

  useEffect(() => {
    loadMails()
    setSearchPrms(filterBy)
  }, [filterBy])

  function loadMails() {
    mailSevice
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.log(err, 'Cant Get Mails')
      })
  }
  function onToggleStarred(mailId) {
    setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail)))

    const previousMails = mails.map((mail) => ({ ...mail }))

    mailSevice.toggleStarred(mailId).catch((err) => {
      console.log('Failed to toggle starred status:', err)

      setMails(previousMails)
    })
  }

  function onSetFilterBy(updatedFilter) {
    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      ...updatedFilter
    }))
  }
  function onRemoveMail(mailId) {
    mailSevice.remove(mailId).then(() => {
      setMails(mails.filter((mail) => mail.id !== mailId))
    })
  }

  if (!mails) return <AppLoader />

  return (
    <main className='mail-index'>
      <MailHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <section className='mail-main-content flex'>
        <SideMenu filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <MailList mails={mails} onToggleStarred={onToggleStarred} onRemoveMail={onRemoveMail} />
        <Outlet />
      </section>
    </main>
  )
}
