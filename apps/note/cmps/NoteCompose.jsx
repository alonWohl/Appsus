import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NoteCompose({onCancle, noteType}) {
    
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
            <input type="text" id='title' placeholder='Title'/>
            {noteType === 'text' && <input type="text" id='text' placeholder='Take a note...'/>}
            {noteType === 'list' && <input type="text" id='list' placeholder='List item'/>}
            {noteType === 'draw' && <input type="text" id='list' placeholder='draw'/>}
            {noteType === 'image' && <input type="image" id='image'/>}
            <button onClick={onCancle}>cancle</button>
        </form>
    )
}