import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NoteCompose({onCancle}) {
    
    const [note, setNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService
            .save(note)
            .then(() => showSuccessMsg('Note saved!'))
            .catch((err) => {
                console.log('err:', err)
                showErrorMsg('Couldnt save note')
            })
            .finally(() => {navigate('/note')})

    }
    
    return (
        <form className='note-compose'>
            <button onClick={onCancle}>cancle</button>
        </form>
    )
}