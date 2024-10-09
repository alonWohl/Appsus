
export function NoteForm({onFormClick}) {
    
    return (
        <form className='note-form'>
        <input type="text" placeholder='Take a note...' onClick={() => onFormClick('text')}/>
        <button className='new-list-note-btn' onClick={() => onFormClick('list')}>List</button>
        <button className='new-canvas-note-btn' onClick={() => onFormClick('draw')}>Drawing</button>
        <button className='new-img-note-btn' onClick={() => onFormClick('image')}>Image</button>
    </form>
    )
}