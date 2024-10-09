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
            notes = notes.filter((note) => note.isRemoved === false)
        } else if(filterBy === 'in:bin') {
            notes = notes.filter((note) => note.isRemoved === true)
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
            'list'
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
                isPinned: false,
                isRemoved: false,
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
    const emptyNote = {
        createdAt: Date.now(),
        type: '',
        isPinned: false,
        isRemoved: false,
        style: {
            backgroundColor: utilService.getRandomColor()
        },
        info: {
            header: '',
            txt: ''
        }
    }

    const {createdAt, type, isPinned, style, info} = emptyNote

    return {createdAt, type, isPinned, style, info} 
}
