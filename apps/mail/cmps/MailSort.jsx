const { useState, useEffect } = React
export function MailSort({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    setFilterByToEdit({ ...filterBy })
    console.log(filterBy)
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
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </section>
  )
}
