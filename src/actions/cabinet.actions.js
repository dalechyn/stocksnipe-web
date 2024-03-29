import { cabinetConstants } from '../constants'
import { cabinetService } from '../services/cabinet.service'
import { alertActions } from './'
import { fetchWithRetry } from '../utils'

const load = () => async dispatch => {
	const request = () => ({ type: cabinetConstants.CABINET_REQUEST })
	const success = () => ({ type: cabinetConstants.CABINET_SUCCESS })
	const failure = () => ({ type: cabinetConstants.CABINET_FAILURE })

	try {
		dispatch(request())
		await dispatch(fetchWithRetry(cabinetService.cabinetLoad))
		dispatch(success())
	} catch (err) {
		dispatch(failure())
		dispatch(alertActions.error(err.statusText))
		throw err
	}
}

const clear = () => ({
	type: cabinetConstants.CABINET_CLEAR
})

export const cabinetActions = {
	load,
	clear
}
