
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, onArchiveNote, onNoteClick, onPinNote}) {
    const navigate = useNavigate()   

    const {id, info, style, type, isPinned, isArchive, isRemoved } = note

    return (
        <li className='note-preview' style={{backgroundColor: `${style.backgroundColor}`}}>
            <article className='note-content'>
                <h1 className='note-preview-header'>{info.header}</h1>
                <button className='pin-btn opacity' onClick={() => onPinNote(id)}><span className={`material-symbols-outlined ${isPinned ? 'pinned' : ''}`}>keep</span></button>
                <div className='note-inner-content' onClick={() => onNoteClick(note)}>
                    {info.txt}
                </div>
                <div className='note-btns'>
                    <button className='delete-btn opacity' onClick={() => onRemoveNote(id)}><span className="material-symbols-outlined">delete</span></button>
                    {!isRemoved && <button className='archive-btn opacity' onClick={() => onArchiveNote(id)}><span className="material-symbols-outlined">archive</span></button>}
                </div>
            </article>
        </li>
    )
}