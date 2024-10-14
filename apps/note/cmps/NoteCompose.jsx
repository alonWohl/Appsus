import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NoteCompose({onCancel, noteType}) {
    
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
                    txt: value,
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
                    txt: value,
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
            txt: prevNote.info.txt,
            header: value
        }})))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        if(note.info.txt === '') return console.log('Cant save note, Please enter text')
        if(note.info.header === '') return console.log('Cant save note, Please enter title')
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
            <input type="text" id='title' placeholder='Title' className='comp-title-input' onChange={handleTitleInput}/>
            {/* {noteType === 'text' && <input type="text" id='text' placeholder='Take a note...' className='comp-text-input' onChange={() => handleInput(event, noteType)}/>} */}
            {noteType === 'text' && <textarea name="text" className='comp-text-input' id="text" rows='1' placeholder='Take a note...' onChange={(event) => handleInput(event, noteType)}></textarea>}
            {noteType === 'list' && <input type="text" id='list' placeholder='List item' onChange={() => handleInput(ev, noteType)}/>}
            {noteType === 'draw' && <input type="text" id='draw' placeholder='draw' onChange={() => handleInput(ev, noteType)}/>}
            {noteType === 'image' && <input type="image" id='image' onChange={() => handleInput(ev, noteType)}/>}
            <div className='comp-btns'>
                <button type='submit' className='comp-submit-btn' onClick={onSaveNote}>Submit</button>
                <button onClick={onCancel} className='comp-cancel-btn'>Close</button>
            </div>
        </form>
    )
}