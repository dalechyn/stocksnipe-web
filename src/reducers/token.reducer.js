import { userConstants } from '../constants'

export const tokens = (state = {}, action) => {
	switch (action.type) {
		case userConstants.TOKENS_REQUEST:
			return {
				tokensPromise: action.tokensPromise
			}
		case userConstants.TOKENS_FAILURE:
			return {}
		case userConstants.TOKENS_SUCCESS:
			return {
				refreshToken: action.refreshToken,
				accessToken: action.accessToken
			}
		default:
			return state
	}
}
