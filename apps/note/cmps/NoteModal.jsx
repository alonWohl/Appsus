
const { useState, useEffect} = React

export function NoteModal({ notes, onCloseModal }) {
    const [modal, setModal] = useState(false)
    const [note, setNote] = useState({})

    useEffect( () => {
        console.log('Note modal monted');
        
        setNoteToOpen(notes)
        toggleModal()
    },[])

    function onInput() {
        console.log('hey from input');
        
    }

    function setNoteToOpen(notes) {
        setNote(notes.find((note) => note.isOpen === true))
    }

    function toggleModal(from) {
        setModal(!modal)
        if(modal) {
            onCloseModal(note)
        }
    }
    return (
        <React.Fragment>
            {modal && 
                <div className='note-modal'>
                    <div className='modal-overlay' onClick={() => toggleModal('overlay')}></div>
                        <div className='modal-content'>
                            <form className='note-modal-form' style={{backgroundColor: `${note.style.backgroundColor}`}}>
                                <input type="text" id='title' placeholder='Title' value={note.info.header} onChange={onInput}/>
                                <input type="text" value={note.info.text} onChange={onInput}/>
                                <button className='close-modal-btn' onClick={() => toggleModal('close btn')}>close</button>
                            </form>
                        </div>
                </div> 
            }
        </React.Fragment>
    )
}