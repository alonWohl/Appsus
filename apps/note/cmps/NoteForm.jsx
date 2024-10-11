
export function NoteForm({onFormClick}) {
    
    return (
        <form className='note-form'>
        <input type="text" placeholder='Take a note...' className='note-text-input' onClick={() => onFormClick('text')}/>
        <button className='note-form-btn' onClick={() => onFormClick('list')}>List</button>
        <button className='note-form-btn' onClick={() => onFormClick('draw')}>Drawing</button>
        <button className='note-form-btn' onClick={() => onFormClick('image')}>Image</button>
    </form>
    )
}