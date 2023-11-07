import { storageService } from './async-storage.service'
// import { httpService } from './httpService'
import mData from '../MOCK_DATA.json'

const STORAGE_KEY = 'person'

async function getPersons() {
    // return httpService.get(`person`)
    return await storageService.query(STORAGE_KEY, mData)
}

async function getById(personId) {
    // return await httpService.get(`person/getPersonById/${personId}`)
    return await storageService.get(STORAGE_KEY, personId)

}

async function remove(personId) {
    // return await httpService.delete(`person/${personId}`)
    return await storageService.remove(STORAGE_KEY, personId)

}

async function save(person) {
    var savedPerson
    if (person.id) {
        // savedPerson = await httpService.put('person', person)
        savedPerson = await storageService.put(STORAGE_KEY, person)

    } else {
        // savedPerson = await httpService.post('person', person)
        savedPerson = await storageService.post(STORAGE_KEY, person)

    }
    return savedPerson
}


function getEmptyPerson() {
    return {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        dob: new Date().toISOString()
    }
}

export const personService = {
    getPersons,
    getById,
    remove,
    save,
    getEmptyPerson,

}

