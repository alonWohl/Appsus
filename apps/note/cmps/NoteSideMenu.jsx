const { Link } = ReactRouterDOM


export function NoteSideMenu({ filterBy, onSetFilterBy, notes}) {

    function onSetFilter(filter) {
        onSetFilterBy(filter)
    }

    return (
        <section className='note-side-menu'>
            <button title='notes' className='notes-btn side-menu-btn' onClick={() => onSetFilter('')}>
                <span className="material-symbols-outlined">lightbulb</span>
            </button>

            <button title='reminders' className='reminders-btn side-menu-btn' onClick={() => onSetFilter('reminders')}>
                <span className="material-symbols-outlined">notifications</span>
            </button>

            <button title='personal' className='personal-btn side-menu-btn' onClick={() => onSetFilter('personal')}>
                <span className="material-symbols-outlined">label</span>
            </button>

            <button title='inspiration' className='inspiration-btn side-menu-btn' onClick={() => onSetFilter('inspiration')}>
                <span className="material-symbols-outlined">label</span>
            </button>

            <button title='work' className='work-btn side-menu-btn' onClick={() => onSetFilter('work')}>
                <span className="material-symbols-outlined">label</span>
            </button>

            <button title='edit-lables' className='edit-lables-btn side-menu-btn'>
                <span className="material-symbols-outlined">edit</span>
            </button>

            <button title='archive' className='archive-side-btn side-menu-btn' onClick={() => onSetFilter('archive')}>
                <span className="material-symbols-outlined">archive</span>
            </button>

            <button title='bin' className='bin-btn side-menu-btn' onClick={() => onSetFilter('in:bin')}>
                <span className="material-symbols-outlined">delete</span>
            </button>
        </section>
    )
}