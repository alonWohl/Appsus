import { NotePreview } from "./NotePreview.jsx"

const { useState, useEffect } = React

export function NoteList({ notes, onRemoveNote, onArchiveNote, onNoteClick, onPinNote, pinnedNotes}) {
    
    
    
    return (
        <React.Fragment>
            {/* <ul className='note-list'> */}
                {pinnedNotes.length > 0 && <React.Fragment>
                    <span className='break-pinned-list'>pinned</span>
                    <div className='pinned-note-list'>
                        {pinnedNotes.map((note) => (
                        <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onNoteClick={onNoteClick} onPinNote={onPinNote} className='note'/>
                        ))}
                    </div>
                    <span className='break-othres-list'>others</span>
                    <div className='others-note-list'>
                        {notes.map((note) => (
                        !note.isPinned && 
                        <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onNoteClick={onNoteClick} onPinNote={onPinNote} className='note'/>
                        ))}
                    </div>
                    </React.Fragment>
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
