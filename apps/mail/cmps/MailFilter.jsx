const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    setFilterByToEdit({ ...filterBy })
  }, [filterBy])

  function handleChange({ target }) {
    const field = target.name
    const value = target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    onSetFilterBy({ [field]: value })
  }

  const { txt } = filterByToEdit

  return (
    <form className='mail-search-wrapper'>
      <input className='mail-search-input' value={txt || ''} onChange={handleChange} type='text' name='txt' id='txt' placeholder='Search mail' />
      <span className='material-symbols-outlined mail-search-icon'>search</span>
    </form>
  )
}
