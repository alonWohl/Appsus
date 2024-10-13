import { noteService } from '../services/note.service.js'
const { useState, useEffect} = React

export function NoteModal({ noteToOpen, onCloseModal }) {
    const [modal, setModal] = useState(false)
    const [note, setNote] = useState({})

    useEffect( () => {
        setNote(noteToOpen)
        toggleModal()
    },[])

    function onTextInput(ev) {
        ev.preventDefault()
        const { value } = ev.target
        setNote((prevNote) => ({...prevNote, info: {
            txt: value,
            header: prevNote.info.header
        }}))
    }

    function onHeaderInput(ev) {
        ev.preventDefault()
        const { value } = ev.target
        setNote((prevNote) => ({...prevNote, info: {
            txt: prevNote.info.txt,
            header: value
        }}))
    }


    function toggleModal() {
        if(modal) {
            noteService.save(note)
            onCloseModal(note)
            setModal(!modal)
            setNote({})
        } else {
            setModal(!modal)
        }
    }
    return (
        <React.Fragment>
            {modal && 
                <div className='note-modal'>
                    <div className='modal-overlay' onClick={toggleModal}></div>
                        <div className='modal-content'>
                            <form className='note-modal-form' style={{backgroundColor: `${note.style.backgroundColor}`}}>
                                <input type="text" id='title' placeholder='Title' value={note.info.header} onChange={(ev) => onHeaderInput(ev)}/>
                                <input type="text" value={note.info.txt} onChange={ev => onTextInput(ev)}/>
                                <button className='close-modal-btn' onClick={toggleModal}>close</button>
                            </form>
                        </div>
                </div> 
            }
        </React.Fragment>
    )
}