const { Link } = ReactRouterDOM


export function NoteSideMenu({ filterBy, onSetFilterBy, notes}) {

    function onSetFilter(filter) {
        onSetFilterBy(filter)
    }

    return (
        <section className='note-side-menu'>
            <button title='notes' className='notes-btn' onClick={() => onSetFilter('')}>
                <span>Notes</span>
            </button>

            <button title='reminders' className='reminders-btn'>
                <span>Reminders</span>
            </button>

            <button title='personal' className='personal-btn'>
                <span>Personal</span>
            </button>

            <button title='inspiration' className='inspiration-btn'>
                <span>Inspiration</span>
            </button>

            <button title='work' className='work-btn'>
                <span>Work</span>
            </button>

            <button title='edit-lables' className='edit-lables-btn'>
                <span>Edit lables</span>
            </button>

            <button title='archive' className='archive-btn'>
                <span>Archive</span>
            </button>

            <button title='bin' className='bin-btn' onClick={() => onSetFilter('in:bin')}>
                <span>Bin</span>
            </button>
        </section>
    )
}