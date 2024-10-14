import { NotePreview } from "./NotePreview.jsx"

const { useState, useEffect } = React

export function NoteList({ notes, onRemoveNote, onArchiveNote, onNoteClick, onPinNote, pinnedNotes}) {

    
    
    return (
        <React.Fragment>
            {/* <ul className='note-list'> */}
                {pinnedNotes.length > 0 && <div className='note-list'>
                    pinned
                    {pinnedNotes.map((note) => (
                    <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onNoteClick={onNoteClick} onPinNote={onPinNote} className='note'/>
                    ))}
                    <br />
                    {notes.map((note) => (
                    !note.isPinned && 
                    <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onNoteClick={onNoteClick} onPinNote={onPinNote} className='note'/>
                    ))}
                </div> 
                }
                
                {/* <div> */}
                {pinnedNotes.length <= 0 && <div className='note-list'>
                    {notes.map((note) => (
                    <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onNoteClick={onNoteClick} onPinNote={onPinNote} className='note'/>
                ))}
                </div> }
                {/* </div> */}
            {/* </ul> */}
        </React.Fragment>

    )
}
