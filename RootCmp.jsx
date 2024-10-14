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
        </Routes>
      </main>
      <UserMsg />
    </Router>
  )
}
