
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote}) {
    const navigate = useNavigate()
    

    const {id, info, style, type, isPinned } = note

    return (
        <li className={`note-preview ${isPinned ? 'pinned' : ''}`} style={{backgroundColor: `${style.backgroundColor}`}}>
            <article className='note-content'>
                <span className='note-preview-header'>{info.header}</span>
                <button className='pin-btn'>Pin</button>
                <button className='delete-note' onClick={() => onRemoveNote(note.id)}>🗑️</button>
                <div className='note-inner-content'>
                    {info.txt}
                </div>
            </article>
        </li>
    )
}