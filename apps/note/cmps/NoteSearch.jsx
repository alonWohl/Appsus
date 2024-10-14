

const { useState, useEffect } = React

export function NoteSearch({ filterBy, onSetFilterBy}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])

    function handleChange(ev) {
        ev.preventDefault()
        const field = ev.target.name
        const value = ev.target.value
        setFilterByToEdit((prevFilter) => ({prevFilter, value}))
        onSetFilterBy( value )
        console.log(filterBy)
    }

    const txt = filterByToEdit

    return (
        <form className="note-search-container">
            <button className='search-btn'><span className="material-symbols-outlined">search</span></button>
            <input type="text" id='txt' name='txt' className='note-search' placeholder='Search' value={txt || ''} onChange={handleChange}/>
        </form>
    )
}