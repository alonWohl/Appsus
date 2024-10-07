
export function NoteForm({onFormClick}) {
    
    return (
        <form className='note-form'>
        <input type="text" placeholder='Take a note...' onClick={onFormClick}/>
        <button className='new-list-note-btn'>List</button>
        <button className='new-canvas-note-btn'>Drawing</button>
        <button className='new-img-note-btn'>Image</button>
    </form>
    )
}