import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onArchiveNote,onNoteClick}) {
    
    // function noteToSend(note) {
    //     onNoteClick(note)
    // }
    
    return (
        <ul className='note-list'>
            {notes.map((note) => (
                // !note.removedAt && 
                <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onNoteClick={onNoteClick}/>
            ))}
        </ul>
    )
}
