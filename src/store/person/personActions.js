import { personService } from '../../services/personService'
import {  startLoading,  loadingFailed,  loadPersonsSuccess,  addPersonSuccess,
  removePersonSuccess,  updatePersonSuccess} from './personSlice.js' 
  
export const loadPersons = () => async (dispatch) => {
  try {
    dispatch(startLoading())
    const persons = await personService.getPersons()
    dispatch(loadPersonsSuccess(persons))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const addPerson = (person) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const savedPerson = await personService.save(person)
    dispatch(addPersonSuccess(savedPerson))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const removePerson = (personId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    await personService.remove(personId)
    dispatch(removePersonSuccess(personId))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const updatePerson = (person) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const updatedPerson = await personService.save(person) 
    dispatch(updatePersonSuccess(updatedPerson))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}


