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
                        <div className='modal-content'  style={{backgroundColor: `${note.style.backgroundColor}`}}>
                            <div className='note-modal-form'>
                                <textarea name="title" className='modal-title' id="title" rows='2' value={note.info.header} onChange={ev => onHeaderInput(ev)}></textarea>
                                <textarea name="text" className='modal-text' id="text" rows='12' value={note.info.txt} onChange={ev => onTextInput(ev)}></textarea>
                                <button className='close-modal-btn' onClick={toggleModal}>close</button>
                            </div>
                        </div>
                </div> 
            }
        </React.Fragment>
    )
}