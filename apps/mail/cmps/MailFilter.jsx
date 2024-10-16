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

  function onClear() {
    setSearchText('')
    onSetFilterBy({ ...filterBy, txt: '' })
  }

  function handleSubmit(ev) {
    ev.preventDefault()
  }

  const isHidden = filterBy.txt ? '' : 'hidden'

  return (
    <div className="mail-search-wrapper">
      <form onSubmit={handleSubmit} className="mail-search-form">
        <button
          className="
        mail-search-btn flex align-center">
          <span className="material-symbols-outlined search-icon">search</span>
        </button>
        <input className="mail-search-input" value={searchText} onChange={handleChange} type="text" name="txt" id="txt" placeholder="Search mail" />
        <button onClick={onClear} className={`mail-close-btn ${isHidden}`}>
          <span className={`material-symbols-outlined close-icon`}>close</span>
        </button>
      </form>
    </div>
  )
}
