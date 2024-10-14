
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, onArchiveNote, onNoteClick, onPinNote}) {
    const navigate = useNavigate()   

    const {id, info, style, type, isPinned, isArchive, isRemoved } = note

    return (
        <li className={`note-preview ${isPinned ? 'pinned' : ''}`} style={{backgroundColor: `${style.backgroundColor}`}}>
            <article className='note-content'>
                <span className='note-preview-header'>{info.header}</span>
                <button className='pin-btn' onClick={() => onPinNote(id)}><span className="material-symbols-outlined">keep</span></button>
                <div className='note-inner-content' onClick={() => onNoteClick(note)}>
                    {info.txt}
                </div>
                <div>
                    <button className='delete-btn' onClick={() => onRemoveNote(id)}><span className="material-symbols-outlined">delete</span></button>
                    {!isRemoved && <button className='archive-btn' onClick={() => onArchiveNote(id)}><span className="material-symbols-outlined">archive</span></button>}
                </div>
            </article>
        </li>
    )
}