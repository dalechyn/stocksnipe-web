import { cabinetConstants } from '../constants'

export const cabinet = (state = {}, action) => {
	switch (action.type) {
		case cabinetConstants.CABINET_REQUEST:
		case cabinetConstants.CABINET_SUCCESS:
			return {}
		case cabinetConstants.CABINET_FAILURE:
			return {
				failedToLoad: true
			}
		case cabinetConstants.CABINET_CLEAR:
			return {}
		default:
			return state
	}
}
