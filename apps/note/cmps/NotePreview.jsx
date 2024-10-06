
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note }) {
    const navigate = useNavigate()
    

    const { info, style, type, isPinned } = note

    return (
        <li className={`note-preview ${isPinned ? 'pinned' : ''}`}>
            <article className='note-content'>
                <span className='note-preview-header'>{info.header}</span>
                <button className='pin-btn'>Pin</button>

                <div className='note-inner-content'>
                    {info.txt}
                </div>
            </article>
        </li>
    )
}