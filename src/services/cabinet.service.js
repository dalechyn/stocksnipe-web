import config from '../config/default'
import { payloadFetch } from '../utils'

const cabinetLoad = (payload = {}) => {
	return payloadFetch(
		`${config.api.url}/test401`,
		{
			...payload
		},
		true
	)
}

export const cabinetService = {
	cabinetLoad
}
