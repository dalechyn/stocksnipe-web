import { tokensConstants, userConstants } from '../constants'
import { usersService } from '../services'
import { alertActions, cabinetActions, tokensActions } from './'
import { history } from '../helpers'

const requestTokenPair = () => ({
	type: userConstants.REFRESH_TOKENS
})

const login = (login, password) => async dispatch => {
	const request = () => ({ type: userConstants.LOGIN_REQUEST })
	const success = user => ({ type: userConstants.LOGIN_SUCCESS, user })
	const failure = () => ({ type: userConstants.LOGIN_FAILURE })

	try {
		dispatch(request())
		const { user, refreshToken, accessToken } = await usersService.login(login, password)

		dispatch(success(user))
		dispatch({
			type: tokensConstants.TOKENS_SET,
			refreshToken,
			accessToken
		})
		dispatch(alertActions.clear())
	} catch (err) {
		dispatch(failure())
		dispatch(alertActions.error(err.statusText))
	}
}

const logout = () => {
	history.push('/')
	return logoutWithoutRedirect()
}

const logoutWithoutRedirect = () => dispatch => {
	dispatch(tokensActions.clear())
	dispatch(cabinetActions.clear())

	usersService.logout()
	dispatch({ type: userConstants.LOGOUT })
}

const register = (email, login, password) => async dispatch => {
	const request = () => ({ type: userConstants.REGISTER_REQUEST })
	const success = async () => {
		await usersService.register(email, login, password)
		return { type: userConstants.REGISTER_SUCCESS }
	}
	const failure = () => ({ type: userConstants.REGISTER_FAILURE })

	try {
		dispatch(request())
		await dispatch(success())
		dispatch(alertActions.clear())
	} catch (err) {
		dispatch(failure())
		dispatch(alertActions.error(err.statusText))
	}
}

export const userActions = {
	login,
	logout,
	logoutWithoutRedirect,
	register,
	requestTokenPair
}
