import { cabinetConstants } from '../constants'
import { cabinetService } from '../services/cabinet.service'

const cabinetLoad = () => ({
	types: [
		cabinetConstants.CABINET_REQUEST,
		cabinetConstants.CABINET_SUCCESS,
		cabinetConstants.CABINET_FAILURE
	],
	callAPI: cabinetService.cabinetLoad()
})

export const cabinetActions = {
	cabinetLoad
}
