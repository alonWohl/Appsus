
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, onArchiveNote, onNoteClick}) {
    const navigate = useNavigate()   

    const {id, info, style, type, isPinned, isArchive, isRemoved } = note

    return (
        <li className={`note-preview ${isPinned ? 'pinned' : ''}`} style={{backgroundColor: `${style.backgroundColor}`}}>
            <article className='note-content'>
                <span className='note-preview-header'>{info.header}</span>
                <button className='pin-btn'>Pin</button>
                <button className='delete-btn' onClick={() => onRemoveNote(id)}>🗑️</button>
                {!isRemoved && <button className='archive-btn' onClick={() => onArchiveNote(id)}>🗃️</button>}
                <div className='note-inner-content' onClick={() => onNoteClick(note)}>
                    {info.txt}
                </div>
            </article>
        </li>
    )
}