import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookPreview
          key={book.id}
          book={book}
          onRemoveBook={onRemoveBook}
        />
      ))}
    </ul>
  )
}
