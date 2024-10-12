const { useState, useEffect } = React
export function MailSort({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    setFilterByToEdit({ ...filterBy })
  }, [filterBy])

  function handleChange({ target }) {
    const field = target.name
    const value = target.value
    setFilterByToEdit((prevFilter) => {
      const updatedFilter = { ...prevFilter, [field]: value }
      onSetFilterBy(updatedFilter)
      return updatedFilter
    })
  }

  const { isRead, date } = filterByToEdit
  return (
    <section className="mail-sort">
      <select
        className="read-select-input"
        onChange={handleChange}
        value={isRead}
        name="isRead"
        id="isRead">
        <option value="">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>

      <select
        className="date-select-input"
        onChange={handleChange}
        value={date}
        name="date"
        id="date">
        <option value="">No date sort</option>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </section>
  )
}
