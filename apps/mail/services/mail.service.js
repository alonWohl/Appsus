// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const loggedinUser = {
  mail: 'user@appsus.com',
  fullname: 'Mahatma Appsus'
}

const MAIL_KEY = 'mailsDb'
_createInboxMails()

export const mailSevice = {
  query,
  get,
  remove,
  save
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      mails = mails.filter((mail) => regex.test(mail.subject))
    }
    if (filterBy.createdAt) {
      mails = mails.filter((mail) => mail.createdAt >= filterBy.createdAt)
    }
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function _createInboxMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    const subjects = [
      'Meeting Reminder: Project Kickoff at 10 AM Tomorrow',
      'Welcome to Our Newsletter – October Edition',
      'Your Order #12345 Has Been Shipped!',
      'Invitation: Webinar on Digital Marketing Trends',
      'Password Reset Request for Your Account'
    ]

    const mailBodies = [
      `Hi Team,
         Just a reminder that our project kickoff meeting is scheduled for tomorrow at 10 AM. Please be prepared to discuss your assigned tasks and timelines.
         Looking forward to seeing everyone there!
         Best,
         John`,

      `Dear Subscriber,
         Welcome to the October edition of our newsletter! This month, we cover the latest updates in the tech world, tips on improving productivity, and upcoming events you don't want to miss.
         Stay tuned for more exciting content!
         Regards,
         The Newsletter Team`,

      `Great news! Your order #12345 has been shipped and is on its way. You can track your package using the tracking number below:
         [Tracking Link]
         Thank you for shopping with us!
         Sincerely,
         The Shop Team`,

      `You’re invited to our upcoming webinar on "Digital Marketing Trends for 2024" taking place on October 15th at 2 PM. Join industry experts as they share insights on how to stay ahead of the curve.
         Reserve your spot today by clicking the link below:
         [Webinar Registration Link]
         Best regards,
         The Marketing Team`,

      `We received a request to reset the password for your account. If this was you, please click the link below to reset your password:
         [Reset Password Link]
         If you did not request this, please ignore this mail.
         Best,
         The Support Team`
    ]

    const fromAddresses = ['momo@momo.com', 'jane@doe.com', 'john@company.com', 'support@service.com', 'info@website.com']

    const mails = []
    for (let i = 0; i < 10; i++) {
      const mail = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        subject: subjects[utilService.getRandomIntInclusive(0, 4)],
        body: mailBodies[utilService.getRandomIntInclusive(0, 4)],
        isRead: false,
        isStared: false,
        sentAt: utilService.getRandomTimestamp(),
        removedAt: null,
        from: fromAddresses[utilService.getRandomIntInclusive(0, 4)],
        to: 'user@appsus.com'
      }
      mails.push(mail)
    }
    utilService.saveToStorage(MAIL_KEY, mails)
  }
}
