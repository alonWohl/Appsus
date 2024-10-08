import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote}) {
    return (
        <ul className='note-list'>
            {notes.map((note) => (
                <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote}/>
            ))}
        </ul>
    )
}
