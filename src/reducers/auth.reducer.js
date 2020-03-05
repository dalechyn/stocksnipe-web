import { userConstants } from '../constants'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export function auth(state = initialState, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: action.user
			}
		case userConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user
			}
		case userConstants.LOGIN_FAILURE:
			return {}
		case userConstants.LOGOUT:
			return {}
		case userConstants.REGISTER_REQUEST:
			return {
				registeringIn: true,
				user: action.user
			}
		case userConstants.REGISTER_SUCCESS || userConstants.REGISTER_FAILURE:
			return {}
		case userConstants.TOKENS_REQUEST:
			return {
				tokens: {
					refreshToken: action.refreshToken
				},
				tokensPromise: action.tokensPromise
			}
		case userConstants.TOKENS_SUCCESS:
			return {
				tokens: {
					refreshToken: action.refreshToken,
					accessToken: action.accessToken
				}
			}
		case userConstants.TOKENS_FAILURE:
			return {}
		default:
			return state
	}
}
