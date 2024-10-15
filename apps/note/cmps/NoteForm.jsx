export function NoteForm({ onFormClick }) {
  return (
    <div className="note-form-container">
      <form className="note-form">
        <input
          type="text"
          placeholder="Take a note..."
          className="note-text-input"
          onClick={() => onFormClick('text')}
        />
        <button
          className="note-form-btn"
          onClick={() => onFormClick('list')}>
          <span className="material-symbols-outlined">check_box</span>
        </button>
        <button
          className="note-form-btn"
          onClick={() => onFormClick('draw')}>
          <span className="material-symbols-outlined">brush</span>
        </button>
        <button
          className="note-form-btn"
          onClick={() => onFormClick('image')}>
          <span className="material-symbols-outlined">image</span>
        </button>
      </form>
    </div>
  )
}
