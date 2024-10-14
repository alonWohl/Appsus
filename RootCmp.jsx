const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailCompose } from './apps/mail/pages/MailCompose.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'

export function App() {
  return (
    <Router>
      <main className="app main-layout">
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/mail"
            element={<MailIndex />}>
            <Route
              path="/mail/:mailId"
              element={<MailDetails />}
            />
            <Route
              path="/mail/compose"
              element={<MailCompose />}
            />
            <Route
              path="/mail/compose/:draftId"
              element={<MailCompose />}
            />
          </Route>
          <Route
            path="/note"
            element={<NoteIndex />}
          />

          <Route
            path="/book"
            element={<BookIndex />}
          />
          <Route
            path="/book/edit"
            element={<BookEdit />}
          />
          <Route
            path="/book/edit/:bookId"
            element={<BookEdit />}
          />
          <Route
            path="/book/:bookId"
            element={<BookDetails />}
          />
        </Routes>
      </main>
      <UserMsg />
    </Router>
  )
}
