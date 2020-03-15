import config from '../config/default'
import { badPayloadError, payloadFetch, setAccessToken, setRefreshToken } from '../utils'

const getNewTokens = async refreshToken => {
	if (!refreshToken) throw badPayloadError('refreshToken', refreshToken)
	const response = await payloadFetch(`${config.api.url}/auth/refresh`, { refreshToken })
	const tokens = await response.json()

	setRefreshToken(tokens.refreshToken)
	setAccessToken(tokens.accessToken)
	return tokens
}

export const tokensService = {
	getNewTokens
}
