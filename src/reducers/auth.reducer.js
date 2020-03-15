import { userConstants } from '../constants'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export const auth = (state = initialState, action) => {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true
			}
		case userConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user
			}
		case userConstants.REGISTER_REQUEST:
			return {
				registeringIn: true
			}
		case userConstants.LOGIN_FAILURE:
		case userConstants.LOGOUT:
		case userConstants.REGISTER_SUCCESS:
		case userConstants.REGISTER_FAILURE:
			return {}
		default:
			return state
	}
}
