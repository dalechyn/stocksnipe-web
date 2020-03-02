import { userConstants } from '../constants'
import { usersService } from '../services'
import { alertActions } from './'
import { history } from '../helpers'

const login = (username, password) => {
	const request = user => ({ type: userConstants.LOGIN_REQUEST, user })
	const success = user => ({ type: userConstants.LOGIN_SUCCESS, user })
	const failure = error => ({ type: userConstants.LOGIN_FAILURE, error })

	return dispatch => {
		dispatch(request({ username }))
		dispatch(alertActions.clear())

		usersService.login(username, password).then(
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

const logout = () => {
	usersService.logout()
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

	getAll
}
