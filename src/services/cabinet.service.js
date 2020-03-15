import config from '../config/default'
import { getAccessToken, payloadFetch } from '../utils'

const cabinetLoad = () => (payload = {}) =>
	payloadFetch(
		`${config.api.url}/test401`,
		{
			...payload
		},
		true
	)

export const cabinetService = {
	cabinetLoad
}
