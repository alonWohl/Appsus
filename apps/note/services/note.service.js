// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote
}

const NOTE_KEY = 'noteDb'
_createNotes()


function query(filterBy) {
    return storageService.query(NOTE_KEY).then((notes) => {
        if(filterBy === '') {
            notes = notes.filter((note) => note.isRemoved === false && note.isArchive === false)
        } else if(filterBy === 'bin') {
            notes = notes.filter((note) => note.isRemoved === true)
        } else if(filterBy === 'reminders') {
            notes = notes.filter((note) => note.label === 'reminders' && note.isRemoved === false)
        } else if(filterBy === 'personal') {
            notes = notes.filter((note) => note.label === 'personal' && note.isRemoved === false)
        } else if(filterBy === 'inspiration') {
            notes = notes.filter((note) => note.label === 'inspiration' && note.isRemoved === false)
        } else if(filterBy === 'work') {
            notes = notes.filter((note) => note.label === 'work' && note.isRemoved === false)
        } else if(filterBy === 'archive') {
            notes = notes.filter((note) => note.isArchive === true && note.isRemoved === false)
        } else if(filterBy) {
            notes = notes.filter((note) => note.info.txt.includes(filterBy) || note.info.header.includes(filterBy) && note.removedAt === null)
        }
        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.get(NOTE_KEY, noteId).then((note) => {
      if (!note.removedAt) {
        note.removedAt = Date.now()
        note.isRemoved = true
        return storageService.put(NOTE_KEY, note)
      } else {
        return storageService.remove(NOTE_KEY, noteId)
      }
    })
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if(!notes || !notes.length) {
        const types = [
            'text',
            'image',
            'list',
            'draw'
        ]
        const labels = [
            'personal',
            'inspiration',
            'work',
            'reminders',
        ]
        const colors =[
            '#e2f6d3',
            '#faafa8',
            '#f39f76',
            '#fff8b8',
            '#b4ddd3',
            '#d4e4ed',
            '#aeccdc',
            '#d3bfdb',
            '#f6e2dd',
            '#e9e3d4',
            '#efeff1'
        ]
        notes = []
        for(let i = 0; i < 10; i++) {
            const note = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                type: types[utilService.getRandomIntInclusive(0,3)],
                label: labels[utilService.getRandomIntInclusive(0,3)],
                isPinned: false,
                isOpen: false,
                isRemoved: false,
                isArchive: false,
                style: {
                    backgroundColor: colors[utilService.getRandomIntInclusive(0,10)]
                },
                info: {
                    header: utilService.makeLorem(2),
                    txt: utilService.makeLorem(50)
                }
            }
            notes.push(note)
        }
        utilService.saveToStorage(NOTE_KEY, notes) 
    }
}


function getEmptyNote() {
    const colors =[
        '#e2f6d3',
        '#faafa8',
        '#f39f76',
        '#fff8b8',
        '#b4ddd3',
        '#d4e4ed',
        '#aeccdc',
        '#d3bfdb',
        '#f6e2dd',
        '#e9e3d4',
        '#efeff1'
    ]
    const emptyNote = {
        createdAt: Date.now(),
        type: '',
        label: '',
        isPinned: false,
        isOpen: false,
        isRemoved: false,
        isArchive: false,
        style: {
            backgroundColor: colors[utilService.getRandomIntInclusive(0,10)]
        },
        info: {
            header: '',
            txt: ''
        }
    }

    const {createdAt, type, label, isPinned, isRemoved, isOpen, isArchive, style, info} = emptyNote

    return {createdAt, type, label, isPinned, isRemoved, isOpen, isArchive, style, info} 
}
