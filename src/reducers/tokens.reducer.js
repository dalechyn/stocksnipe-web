import { tokensConstants } from '../constants'

export const tokens = (
	state = {
		refreshToken: localStorage.getItem('refreshToken'),
		accessToken: localStorage.getItem('accessToken')
	},
	action
) => {
	switch (action.type) {
		case tokensConstants.TOKENS_REQUEST:
			return {
				tokensRefreshing: action.tokensRefreshing,
				refreshToken: action.refreshToken
			}
		case tokensConstants.TOKENS_SUCCESS:
		case tokensConstants.TOKENS_SET:
			return {
				refreshToken: action.refreshToken,
				accessToken: action.accessToken
			}
		case tokensConstants.TOKENS_FAILURE:
			return {
				tokensRefreshFailed: true
			}
		default:
			return state
	}
}
