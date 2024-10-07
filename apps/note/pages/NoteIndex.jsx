import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideMenu } from '../cmps/NoteSideMenu.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

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
    
    return (
        <section className='note-index'>
            <NoteList notes={notes}/>
            <NoteSideMenu />
        </section>
    )
}
