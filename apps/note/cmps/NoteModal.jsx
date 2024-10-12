import { noteService } from '../services/note.service.js'
const { useState, useEffect} = React

export function NoteModal({ noteToOpen, onCloseModal }) {
    const [modal, setModal] = useState(false)
    const [note, setNote] = useState({})

    useEffect( () => {
        setNote(noteToOpen)
        toggleModal()
    },[])

    function onInput(from) {

    }


    function toggleModal() {
        if(modal) {
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
                    <div className='modal-overlay' onClick={() => toggleModal('overlay')}></div>
                        <div className='modal-content'>
                            <form className='note-modal-form' style={{backgroundColor: `${note.style.backgroundColor}`}}>
                                <input type="text" id='title' placeholder='Title' value={note.info.header} onChange={() => onInput()}/>
                                <input type="text" value={note.info.txt} onChange={onInput}/>
                                <button className='close-modal-btn' onClick={() => toggleModal('close btn')}>close</button>
                            </form>
                        </div>
                </div> 
            }
        </React.Fragment>
    )
}