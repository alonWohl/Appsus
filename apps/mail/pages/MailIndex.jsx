import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { SideMenu } from '../cmps/SideMenu.jsx'
import { mailService } from '../services/mail.service.js'
import { MailDetails } from './MailDetails.jsx'

const { useState, useEffect } = React
const { useSearchParams, Outlet, useParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [unreadCounts, setUnreadCounts] = useState({})

  const [searchPrms, setSearchPrms] = useSearchParams()
  const [isExpand, setIsExpand] = useState(false)

  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))
  const { mailId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadMails()
    setSearchPrms(filterBy)
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(({ mails, unreadCounts }) => {
        setMails(mails)
        setUnreadCounts(unreadCounts)
      })
      .catch((err) => {
        console.log(err, 'Cant Get Mails')
        showErrorMsg('Failed to load mails')
      })
  }

  function handleBackNavigation() {
    loadMails()
    navigate('/mail')
  }
  function onToggleStarred(ev, mailId) {
    ev.stopPropagation()

    setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail)))

    const previousMails = mails.map((mail) => ({ ...mail }))

    mailService.toggleStarred(mailId).catch((err) => {
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

    mailService
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
    mailService.get(mailId).then((mail) => {
      mail.isRead = !mail.isRead

      return mailService.save(mail)
    })
  }

  function onToggleHamburger() {
    setIsExpand((prevIsExpand) => !prevIsExpand)
  }

  if (!mails) return <AppLoader />

  return (
    <main className="mail-index">
      <MailHeader
        onBack={handleBackNavigation}
        filterBy={filterBy}
        onSetFilterBy={onSetFilterBy}
        onToggleHamburger={onToggleHamburger}
        isExpand={isExpand}
      />
      <section className={`mail-main-content flex ${isExpand ? 'expanded' : ''}`}>
        <SideMenu
          isExpand={isExpand}
          filterBy={filterBy}
          unreadCounts={unreadCounts}
          onSetFilterBy={onSetFilterBy}
        />
        {mailId ? (
          <MailDetails
            onRemoveMail={onRemoveMail}
            onBack={handleBackNavigation}
          />
        ) : (
          <MailList
            mails={mails}
            filterBy={filterBy}
            onSetFilterBy={onSetFilterBy}
            onToggleRead={onToggleRead}
            onToggleStarred={onToggleStarred}
            onRemoveMail={onRemoveMail}
          />
        )}
      </section>
      {!mailId && <Outlet />}
    </main>
  )
}
