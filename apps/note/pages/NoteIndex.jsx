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


    useEffect( () => {
        loadNotes()
    },[])

    function loadNotes() {
        noteService
            .query()
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
    
    return (
        <section className='note-index'>
            <NoteHeader />
            {inputClick ? <NoteCompose onCancle={onCancleNewNote} noteType={newNoteType}/> : <NoteForm onFormClick={handleFormClick}/>}
            <NoteList notes={notes}/>
            <NoteSideMenu />
        </section>
    )
}
