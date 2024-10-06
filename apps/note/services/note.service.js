// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'



const NOTE_KEY = 'noteDb'

function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.get(NOTE_KEY, noteId).then((note) => {
      if (!note.removedAt) {
        note.removedAt = Date.now()
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
            'NoteTxt',
            'NoteImg',
            'NoteTodos'
        ]
        notes = []
        for(let i = 0; i < 0; i++) {
            const note = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                type: types[utilService.getRandomIntInclusive(0,3)],
                isPinned: false,
                style: {
                    backgroundColor: utilService.getRandomColor()
                },
                info: {
                    txt: utilService.makeLorem(50)
                }
            }
            notes.push(note)
        }
        utilService.saveToStorage(NOTE_KEY, notes) 
    }
}

