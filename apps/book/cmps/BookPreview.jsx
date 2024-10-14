const { Link } = ReactRouterDOM
import { getCurrencySymbol } from '../../../services/util.service.js'

export function BookPreview({ book, onRemoveBook }) {
  return (
    <li className="book-preview">
      <img
        src={book.thumbnail}
        alt="book-image"
      />
      <h2>{book.title}</h2>
      <h4>{`Price: ${book.listPrice.amount} ${getCurrencySymbol(book.listPrice.currencyCode)} `}</h4>

      <div className="book-actions">
        <button
          onClick={() => onRemoveBook(book.id)}
          className="btn remove-btn">
          <span class="material-symbols-outlined">delete</span>
        </button>

        <Link
          className="btn "
          to={`/book/${book.id}`}>
          <span class="material-symbols-outlined">info</span>
        </Link>

        <Link
          className="btn edit-btn"
          to={`/book/edit/${book.id}`}>
          <span class="material-symbols-outlined">edit</span>
        </Link>
      </div>
    </li>
  )
}
