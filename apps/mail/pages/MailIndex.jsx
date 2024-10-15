import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { SideMenu } from '../cmps/SideMenu.jsx'
import { mailService } from '../services/mail.service.js'
import { MailCompose } from './MailCompose.jsx'
import { MailDetails } from './MailDetails.jsx'

const { useState, useEffect } = React
const { Outlet, useParams, useNavigate, useSearchParams } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [unreadCounts, setUnreadCounts] = useState({})
  const [isExpand, setIsExpand] = useState(false)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  const [searchParams, setSearchParams] = useSearchParams()

  const { category, mailId } = useParams()
  const navigate = useNavigate()

  const isCompose = searchParams.get('compose') === 'new'
  const draftId = searchParams.get('draftId')

  useEffect(() => {
    const currentCategory = category || 'inbox'
    const newFilterBy = { ...filterBy, status: currentCategory }
    setFilterBy(newFilterBy)
    loadMails(newFilterBy)
  }, [category])

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(({ mails, unreadCounts }) => {
        setUnreadCounts(unreadCounts)
        setMails(mails)
      })
      .catch((err) => {
        console.log(err, 'Cant Get Mails')
        showErrorMsg('Failed to load mails')
      })
  }

  function handleBackNavigation() {
    loadMails()
    navigate('/mail/inbox')
  }

  function onToggleStarred(ev, mailId) {
    ev.stopPropagation()
    setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail)))
    mailService
      .toggleStarred(mailId)
      .then(() => {})
      .catch((err) => {
        console.error('Failed to toggle starred status:', err)
        showErrorMsg('Failed to update starred status')
        setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail)))
      })
  }

  function onSetFilterBy(updatedFilter) {
    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      ...updatedFilter
    }))
    if (updatedFilter.status) {
      navigate(`/mail/${updatedFilter.status}`)
    }
  }

  function onRemoveMail(ev, mailId) {
    ev.stopPropagation()
    setMails(mails.filter((mail) => mail.id !== mailId))
    const previousMails = mails.map((mail) => ({ ...mail }))
    mailService
      .remove(mailId)
      .then(() => {
        showSuccessMsg('Mail removed successfully')
        navigate('/mail/inbox')
      })
      .catch((err) => {
        console.error(err)
        showErrorMsg('Cannot remove Mail')
        setMails(previousMails)
      })
  }

  function onToggleRead(ev, mailIdToToggle) {
    if (ev) ev.stopPropagation()
    const targetMailId = mailIdToToggle || mailId
    if (targetMailId) {
      setMails((prevMails) => prevMails.map((mail) => (mail.id === targetMailId ? { ...mail, isRead: !mail.isRead } : mail)))
      mailService
        .get(targetMailId)
        .then((mail) => {
          mail.isRead = !mail.isRead
          return mailService.save(mail)
        })
        .catch((err) => {
          console.error('Failed to update read status:', err)
          showErrorMsg('Failed to update read status')
          setMails((prevMails) => prevMails.map((mail) => (mail.id === targetMailId ? { ...mail, isRead: !mail.isRead } : mail)))
          if (!mailIdToToggle) navigate('/mail/inbox')
        })
    }
  }

  function onToggleHamburger() {
    setIsExpand((prevIsExpand) => !prevIsExpand)
  }

  function handleComposeClick() {
    setSearchParams({ compose: 'new' })
  }

  function handleCloseCompose() {
    searchParams.delete('compose')
    searchParams.delete('draftId')
    setSearchParams(searchParams)
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
          currentCategory={category}
          unreadCounts={unreadCounts}
          onComposeClick={handleComposeClick}
          onSetFilterBy={onSetFilterBy}
        />
        <Outlet
          context={{
            mails,
            filterBy,
            onSetFilterBy,
            onToggleRead,
            onToggleStarred,
            onRemoveMail,
            onBack: handleBackNavigation
          }}
        />
        {isCompose && (
          <MailCompose onClose={handleCloseCompose} draftId={draftId} onSaveDraft={(draftId) => setSearchParams({ compose: 'new', draftId })} />
        )}
      </section>
    </main>
  )
}
