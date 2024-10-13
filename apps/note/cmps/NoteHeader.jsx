import { NoteSearch } from '../cmps/NoteSearch.jsx'

export function NoteHeader({filterBy, onSetFilterBy}) {

    return(
        <header className='note-header'>
            <button className='side-menu-btn'><span className="material-symbols-outlined">menu</span></button>
            <div className='note-logo'><img src="./assets/img/keep-logo.png" alt="Keep logo" /></div>
            <div className='note-keep'>Keep</div>
            <NoteSearch filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
        </header> 
    )
}