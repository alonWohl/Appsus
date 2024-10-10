import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { SideMenu } from '../cmps/SideMenu.jsx'
import { mailSevice } from '../services/mail.service.js'
import { MailDetails } from './MailDetails.jsx'

const { useState, useEffect } = React
const { useSearchParams, Outlet, useParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [searchPrms, setSearchPrms] = useSearchParams()
  const [isExpand, setIsExpand] = useState(false)

  const [filterBy, setFilterBy] = useState(mailSevice.getFilterFromSearchParams(searchPrms))
  const { mailId } = useParams()
  const navigate = useNavigate()

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
  function onToggleStarred(ev, mailId) {
    ev.stopPropagation()

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
  function onRemoveMail(ev, mailId) {
    ev.stopPropagation()
    setMails(mails.filter((mail) => mail.id !== mailId))

    const previousMails = mails.map((mail) => ({ ...mail }))

    mailSevice
      .remove(mailId)
      .then(showSuccessMsg('Mail removed successfully'))
      .catch((err) => {
        console.error(err)
        showErrorMsg('Cannot remove Mail')
        setMails(previousMails)
      })
      .finally(navigate('/mail'))
  }

  function onToggleRead(ev, mailId) {
    ev.stopPropagation()

    setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail)))
    mailSevice.get(mailId).then((mail) => {
      mail.isRead = !mail.isRead

      return mailSevice.save(mail)
    })
  }

  function onToggleHamburger() {
    setIsExpand((prevIsExpand) => !prevIsExpand)
  }

  if (!mails) return <AppLoader />

  return (
    <main className='mail-index'>
      <MailHeader navigate={navigate} filterBy={filterBy} onSetFilterBy={onSetFilterBy} onToggleHamburger={onToggleHamburger} isExpand={isExpand} />
      <section className={`mail-main-content flex ${isExpand ? 'expanded' : ''}`}>
        <SideMenu isExpand={isExpand} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        {mailId ? (
          <MailDetails onRemoveMail={onRemoveMail} />
        ) : (
          <MailList mails={mails} onToggleRead={onToggleRead} onToggleStarred={onToggleStarred} onRemoveMail={onRemoveMail} />
        )}
      </section>
      {!mailId && <Outlet />}
    </main>
  )
}
