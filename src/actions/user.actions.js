import { alertConstants, userConstants } from '../constants'
import { usersService } from '../services'
import { alertActions } from './'
import { history } from '../helpers'
import {
	checkTokenExpired,
	getAccessToken,
	getRefreshToken,
	payloadFetch,
	setAccessToken,
	setRefreshToken,
	setUser
} from '../utils'
import config from '../config/default'
// Returns a promise that tries to get tokens if pr returns a response with 401 code
// pr must return fetch response on reject

const requestTokenPair = () => ({
	type: userConstants.TOKENS_REQUEST
})

const login = dispatch => (username, password) => ({
	types: [
		userConstants.LOGIN_REQUEST,
		userConstants.LOGIN_SUCCESS,
		userConstants.LOGIN_FAILURE
	],
	callAPI: usersService.login(dispatch),
	payload: { login: username, password }
})

const logout = () => {
	usersService.logout()
	history.push('/')
	return { type: userConstants.LOGOUT }
}

const register = (email, username, password) => {
	const request = user => ({ type: userConstants.REGISTER_REQUEST, user })
	const success = user => ({ type: userConstants.REGISTER_SUCCESS, user })
	const failure = error => ({ type: userConstants.REGISTER_FAILURE, error })

	return async dispatch => {
		dispatch(request({ email, username, password }))
		dispatch(alertActions.clear())

		try {
			const user = await usersService.register(email, username, password)
			dispatch(success(user))
			history.push('/')
		} catch (e) {
			dispatch(failure(e))
			dispatch(alertActions.error(e))
		}
	}
}

export const userActions = {
	login,
	logout,
	register,
	requestTokenPair
}
