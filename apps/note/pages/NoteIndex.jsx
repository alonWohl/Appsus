import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideMenu } from '../cmps/NoteSideMenu.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteCompose } from '../cmps/NoteCompose.jsx';
import { NoteForm } from '../cmps/NoteForm.jsx';

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [inputClick, onInputclick] = useState(null)
    const [newNoteType, setNoteType] = useState(null)
    const [filterBy, setFilterBy] = useState('')


    useEffect( () => {
        loadNotes()
    },[filterBy])

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

    function onSetFilterBy(filter) {
        setFilterBy(filter)
    }

    return (
        <section className='note-index'>
            <NoteHeader />
            {inputClick ? <NoteCompose onCancle={onCancleNewNote} noteType={newNoteType}/> : <NoteForm onFormClick={handleFormClick}/>}
            <NoteList notes={notes} onRemoveNote={onRemoveNote}/>
            <NoteSideMenu notes={notes} onSetFilterBy={onSetFilterBy}/>
        </section>
    )
}
