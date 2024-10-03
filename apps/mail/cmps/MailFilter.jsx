const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { status, txt, isRead, isStarred, labels } = filterByToEdit

  return (
    <form onSubmit={onSubmit}>
      <input value={txt} onChange={handleChange} type='txt' name='txt' id='txt' placeholder='Search mail' />
    </form>
  )
}
