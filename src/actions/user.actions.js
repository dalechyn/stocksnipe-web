import { userConstants } from '../constants'
import { usersService } from '../services'
import { alertActions } from './'
import { history } from '../helpers'
import { checkTokenExpired, getAccessToken, getRefreshToken } from '../utils'

// Returns a promise that tries to get tokens if pr returns a response with 401 code
// pr must return fetch response on reject
const withTokenRefreshAttempt = (dispatch, pr, onResolve, onReject) =>
	pr.then(onResolve, response => {
		if (response.status === 401) {
			const accessToken = getAccessToken()
			const refreshToken = getRefreshToken()

			if (!accessToken || !refreshToken || checkTokenExpired(refreshToken)) {
				onReject()
			}

			if (checkTokenExpired(accessToken)) {
				dispatch(renewTokenPair(refreshToken))
				pr.then(onResolve, onReject)
			}
		}
	})

const renewTokenPair = refreshToken => {
	const request = tokensPromise => ({
		type: userConstants.TOKENS_REQUEST,
		tokensPromise
	})
	const success = () => ({
		type: userConstants.TOKENS_SUCCESS
	})
	const failure = error => ({ type: userConstants.TOKENS_FAILURE, error })

	return async dispatch => {
		dispatch(
			request(
				usersService.refreshTokenPair(refreshToken).then(
					() => dispatch(success()),
					error => dispatch(failure(error))
				)
			)
		)
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
	return dispatch => {
		dispatch(request())
		dispatch(alertActions.clear())

		usersService.getAll().then(
			users => dispatch(success(users)),
			error => dispatch(failure(error))
		)
	}
}

const register = (email, username, password) => {
	const request = user => ({ type: userConstants.REGISTER_REQUEST, user })
	const success = user => ({ type: userConstants.REGISTER_SUCCESS, user })
	const failure = error => ({ type: userConstants.REGISTER_FAILURE, error })

	return dispatch => {
		dispatch(request({ email, username, password }))
		dispatch(alertActions.clear())

		usersService.register(email, username, password).then(
			user => {
				dispatch(success(user))
				history.push('/')
			},
			error => {
				dispatch(failure(error))
				dispatch(alertActions.error(error))
			}
		)
	}
}

export const userActions = {
	login,
	logout,
	register,
	renewTokenPair,

	getAll
}
