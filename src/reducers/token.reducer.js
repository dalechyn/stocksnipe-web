import { userConstants } from '../constants'

export const token = (state = {}, action) => {
	switch (action.type) {
		case userConstants.TOKENS_REQUEST:
			return {
				tokensFetching: true
			}
		case userConstants.TOKENS_FAILURE:
		case userConstants.TOKENS_SUCCESS:
			return {}
		default:
			return state
	}
}
