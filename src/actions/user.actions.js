import { userConstants } from '../constants'
import { usersService } from '../services'
import { alertActions } from './'
import { history } from '../helpers'
import { checkTokenExpired, getAccessToken, getRefreshToken } from '../utils'

// Returns a promise that tries to get tokens if pr returns a response with 401 code
// pr must return fetch response on reject
const withTokenRefreshAttempt = async (dispatch, pr) => {
	try {
		return await pr
	} catch (response) {
		if (response.status === 401) {
			const accessToken = getAccessToken()
			const refreshToken = getRefreshToken()

			if (!accessToken || !refreshToken || checkTokenExpired(refreshToken)) {
				throw new Error('Refresh token is expired, re-authentication needed')
			}

			if (checkTokenExpired(accessToken)) {
				await dispatch(renewTokenPair(refreshToken))
				return await pr
			}
		}
		throw response
	}
}

const renewTokenPair = refreshToken => {
	const request = () => ({
		type: userConstants.TOKENS_REQUEST
	})
	const success = () => ({
		type: userConstants.TOKENS_SUCCESS
	})
	const failure = error => ({ type: userConstants.TOKENS_FAILURE, error })

	return async dispatch => {
		try {
			dispatch(request())
			await usersService.refreshTokenPair(refreshToken)
			dispatch(success())
		} catch (e) {
			dispatch(failure(e))
		}
	}
}

const login = (username, password) => {
	const request = user => ({ type: userConstants.LOGIN_REQUEST, user })
	const success = user => ({ type: userConstants.LOGIN_SUCCESS, user })
	const failure = error => ({ type: userConstants.LOGIN_FAILURE, error })

	return async dispatch => {
		dispatch(request({ username }))
		dispatch(alertActions.clear())

		try {
			const user = await usersService.login(username, password)
			dispatch(success(user))
			history.push('/')
		} catch (response) {
			console.log(response)
			const error = response.statusText

			dispatch(failure(error))
			dispatch(alertActions.error(error))
		}
	}
}

const logout = () => {
	usersService.logout()
	history.push('/')
	return { type: userConstants.LOGOUT }
}

const getAll = () => {
	const request = () => ({ type: userConstants.GETALL_REQUEST })
	const success = users => ({ type: userConstants.GETALL_SUCCESS, users })
	const failure = error => ({ type: userConstants.GETALL_FAILURE, error })
	return async dispatch => {
		dispatch(request())
		dispatch(alertActions.clear())

		try {
			const users = await usersService.getAll()
			dispatch(success(users))
		} catch (e) {
			dispatch(failure(e))
		}
	}
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
	renewTokenPair,

	getAll
}
