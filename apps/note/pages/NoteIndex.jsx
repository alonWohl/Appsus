import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideMenu } from '../cmps/NoteSideMenu.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteCompose } from '../cmps/NoteCompose.jsx';
import { NoteForm } from '../cmps/NoteForm.jsx';
import { NoteModal } from '../cmps/NoteModal.jsx';

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [inputClick, onInputclick] = useState(null)
    const [newNoteType, setNoteType] = useState(null)
    const [filterBy, setFilterBy] = useState('')
    const [noteModal, setNoteModal] = useState(false)


    useEffect( () => {
        loadNotes()
    },[filterBy, notes])

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

    function onCancleNewNote() {
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
        if(!note.isArchive) {
            note.isArchive = true
            noteService
                .save(note)
                .finally(console.log('Note is in archive!'))
        } else if(note.isArchive) {
            note.isArchive = false
            noteService
            .save(note)
            .finally(console.log('Note is in archive!'))
        }
    }

    function onSetFilterBy(filter) {
        setFilterBy(filter)
    }


    function onNoteClick(noteToOpen) {
        console.log('hey from notetoclick index');
        const note = notes.find((note) => note.id === noteToOpen.id)
        note.isOpen = true
        noteService
        .save(note)
        .then(setNoteModal(!noteModal))
    }

    function onCloseModal(noteToClose) {
        const note = notes.find((note) => note.id === noteToClose.id)
        note.isOpen = false
        noteService
        .save(note)
        .then(setNoteModal(!noteModal))
    }

    return (
        <section className='note-index'>
            <NoteHeader />
            {inputClick ? <NoteCompose onCancle={onCancleNewNote} noteType={newNoteType}/> : <NoteForm onFormClick={handleFormClick}/>}
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onNoteClick={onNoteClick}/>
            <NoteSideMenu notes={notes} onSetFilterBy={onSetFilterBy}/>
            {noteModal && <NoteModal notes={notes} onCloseModal={onCloseModal}/>}
        </section>
    )
}
