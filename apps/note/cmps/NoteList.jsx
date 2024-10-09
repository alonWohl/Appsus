import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onArchiveNote}) {
    return (
        <ul className='note-list'>
            {notes.map((note) => (
                // !note.removedAt && 
                <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote}/>
            ))}
        </ul>
    )
}
