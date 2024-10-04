import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
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
    <React.Fragment>
      <MailHeader>
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      </MailHeader>

      <section className='mail-index'>
        <SideMenu filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <MailList mails={mails} onToggleStarred={onToggleStarred} onRemoveMail={onRemoveMail} />
        <Outlet />
      </section>
    </React.Fragment>
  )
}
