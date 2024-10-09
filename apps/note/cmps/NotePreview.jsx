
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, onArchiveNote}) {
    const navigate = useNavigate()
    

    const {id, info, style, type, isPinned, isArchive } = note

    return (
        <li className={`note-preview ${isPinned ? 'pinned' : ''}`} style={{backgroundColor: `${style.backgroundColor}`}}>
            <article className='note-content'>
                <span className='note-preview-header'>{info.header}</span>
                <button className='pin-btn'>Pin</button>
                <button className='delete-btn' onClick={() => onRemoveNote(note.id)}>🗑️</button>
                {!note.isArchive && <button className='archive-btn' onClick={() => onArchiveNote(note.id)}>🗃️</button>}
                <div className='note-inner-content'>
                    {info.txt}
                </div>
            </article>
        </li>
    )
}