import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { getTruthyValues } from '../../../services/util.service.js'
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
  const [isExpand, setIsExpand] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
  const [unreadCounts, setUnreadCounts] = useState({})

  const { category } = useParams()
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
      .then((mails) => setMails(mails))
      .catch((err) => {
        console.log(err, 'Cant Get Mails')
        showErrorMsg('Failed to load mails')
      })
  }

  useEffect(() => {
    mailService.getUnreadMailCounts().then(setUnreadCounts)
  }, [unreadCounts])

  function handleBackNavigation() {
    loadMails()
    navigate('/mail/inbox')
  }

  function onToggleStarred(ev, mailId) {
    ev.stopPropagation()
    setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail)))
    mailService.toggleStarred(mailId).catch((err) => {
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
    if (ev) ev.stopPropagation()
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
  function onToggleRead(ev, mailId) {
    ev.stopPropagation()

    setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail)))
    const previousMails = mails.map((mail) => ({ ...mail }))

    mailService
      .get(mailId)
      .then((mail) => {
        mail.isRead = !mail.isRead
      })
      .catch((err) => {
        console.error(err, 'cant toggle read')
        setMails(previousMails)
      })
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
          filterBy={filterBy}
          isExpand={isExpand}
          currentCategory={category}
          onComposeClick={handleComposeClick}
          onSetFilterBy={onSetFilterBy}
          unreadCounts={unreadCounts}
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
