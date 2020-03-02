import { userConstants } from '../constants'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export function authentication(state = initialState, action) {
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
		case userConstants.LOGIN_FAILURE || userConstants.LOGOUT:
			return {}
		case userConstants.REGISTER_REQUEST:
			return {
				registeringIn: true,
				user: action.user
			}
		case userConstants.REGISTER_SUCCESS || userConstants.REGISTER_FAILURE:
			return {}
		default:
			return state
	}
}
