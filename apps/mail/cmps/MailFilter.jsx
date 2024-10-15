const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setSearchText(filterBy.txt || '')
  }, [filterBy.txt])

  function handleChange({ target }) {
    const { value } = target

    setSearchText(value)
    onSetFilterBy({ ...filterBy, txt: value })
  }

  function handleSubmit(ev) {
    ev.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="mail-search-wrapper">
      <input className="mail-search-input" value={searchText} onChange={handleChange} type="text" name="txt" id="txt" placeholder="Search mail" />
      <span className="material-symbols-outlined mail-search-icon">search</span>
    </form>
  )
}
