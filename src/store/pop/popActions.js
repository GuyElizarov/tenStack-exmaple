import { popService } from '../../services/popService'
import {  startLoading,  loadingFailed,  loadPopsSuccess,  addPopSuccess,
  removePopSuccess,  updatePopSuccess} from './popSlice.js' 
export const loadPops = () => async (dispatch) => {
  try {
    dispatch(startLoading())
    console.log('loading pops');
    const pops = await popService.getPops()
    dispatch(loadPopsSuccess(pops))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const addPop = (pop) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const savedPop = await popService.save(pop)
    dispatch(addPopSuccess(savedPop))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const removePop = (popId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    await popService.remove(popId)
    dispatch(removePopSuccess(popId))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const updatePop = (pop) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const updatedPop = await popService.save(pop) 
    dispatch(updatePopSuccess(updatedPop))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}


