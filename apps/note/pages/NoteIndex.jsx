import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideMenu } from '../cmps/NoteSideMenu.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteCompose } from '../cmps/NoteCompose.jsx'
import { NoteForm } from '../cmps/NoteForm.jsx'
import { NoteModal } from '../cmps/NoteModal.jsx'

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [inputClick, onInputclick] = useState(null)
  const [newNoteType, setNoteType] = useState(null)
  const [filterBy, setFilterBy] = useState('')
  const [isExpand, setIsExpand] = useState(false)
  const [noteModal, setNoteModal] = useState(false)
  const [noteToOpen, setNoteToOpen] = useState({})
  const [pinnedNotes, setPinnedNotes] = useState(checkForPinned())

  useEffect(() => {
    loadNotes()
    setPinnedNotes(checkForPinned())
  }, [filterBy, notes])

  function loadNotes() {
    noteService
      .query(filterBy)
      .then(setNotes)
      .catch((err) => {
        console.log(err, 'Cant Get Notes')
      })
  }

  function handleFormClick(type) {
    setNoteType(type)
    onInputclick(1)
  }

  function onCancelNewNote() {
    onInputclick(null)
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(setNotes(notes.filter((note) => note.id !== noteId)))
      .finally(console.log('Note removed!'))
  }

  function onArchiveNote(noteId) {
    const note = notes.find((note) => note.id === noteId)
    if (!note.isArchive) {
      note.isArchive = true
      noteService.save(note).finally(console.log('Note is in archive!'))
    } else if (note.isArchive) {
      note.isArchive = false
      noteService.save(note).finally(console.log('Note is in archive!'))
    }
  }

  function onSetFilterBy(filter) {
    setFilterBy(filter)
  }

  function onPinNote(noteToFind) {
    const noteToPin = notes.find((note) => note.id === noteToFind)
    if (!noteToPin.isPinned) {
      noteToPin.isPinned = true
      noteService.save(noteToPin)
    } else if (noteToPin.isPinned) {
      noteToPin.isPinned = false
      noteService.save(noteToPin)
    }
  }

  function checkForPinned() {
    const pinnedNotes = notes.filter((note) => note.isPinned === true)
    return pinnedNotes
  }

  function onNoteClick(noteToFind) {
    setNoteToOpen(notes.find((note) => note.id === noteToFind.id))
    setNoteModal(!noteModal)
  }

  function onCloseModal() {
    setNoteModal(!noteModal)
  }

  function onToggleHamburger() {
    setIsExpand((prevIsExpand) => !prevIsExpand)
  }

  return (
    <section className="note-index">
      <NoteHeader
        filterBy={filterBy}
        onSetFilterBy={onSetFilterBy}
        onToggleHamburger={onToggleHamburger}
        isExpand={isExpand}
      />

      {inputClick ? (
        <NoteCompose
          onCancel={onCancelNewNote}
          noteType={newNoteType}
        />
      ) : (
        <NoteForm onFormClick={handleFormClick} />
      )}
      <section className={`note-main-content  ${isExpand ? 'expanded' : ''}`}>
        <NoteList
          notes={notes}
          onRemoveNote={onRemoveNote}
          onArchiveNote={onArchiveNote}
          onNoteClick={onNoteClick}
          onPinNote={onPinNote}
          pinnedNotes={pinnedNotes}
        />
        <NoteSideMenu
          isExpand={isExpand}
          notes={notes}
          onSetFilterBy={onSetFilterBy}
        />
      </section>
      {noteModal && (
        <NoteModal
          noteToOpen={noteToOpen}
          onCloseModal={onCloseModal}
        />
      )}
    </section>
  )
}
