import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NoteCompose({onCancle, noteType}) {
    
    const [note, setNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    useEffect(() =>{
        setNote({...note, type: noteType})
    }, [])

    function handleInput(ev, noteType) {
        const { value } = ev.target
        switch(noteType) {
            case 'text' :
                setNote((prevNote) => ({...prevNote, info: {
                    text: value,
                    header: prevNote.info.header
                }}))
                break
            case 'list' : 
                setNote((prevNote) => ({...prevNote, info: {
                    list: value,
                    header: prevNote.info.header
                }}))
                break
            case 'draw' :
                setNote((prevNote) => ({...prevNote, info: {
                    text: value,
                    header: prevNote.info.header
                }}))
                break
            case 'image' :
                setNote((prevNote) => ({...prevNote, info: {
                    Image: value,
                    header: prevNote.info.header
                }}))
                break
        }

    }
    
    function handleTitleInput(ev) {
        const { value } = ev.target
        setNote((prevNote => ({...prevNote, info: {
            header: value
        }})))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        console.log(note);
        
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
            <input type="text" id='title' placeholder='Title' onChange={handleTitleInput}/>
            {noteType === 'text' && <input type="text" id='text' placeholder='Take a note...' onChange={() => handleInput(event, noteType)}/>}
            {noteType === 'list' && <input type="text" id='list' placeholder='List item' onChange={() => handleInput(ev, noteType)}/>}
            {noteType === 'draw' && <input type="text" id='list' placeholder='draw' onChange={() => handleInput(ev, noteType)}/>}
            {noteType === 'image' && <input type="image" id='image' onChange={() => handleInput(ev, noteType)}/>}
            <button onClick={onCancle}>cancle</button>
            <button type='submit' onClick={onSaveNote}>Submit</button>
        </form>
    )
}