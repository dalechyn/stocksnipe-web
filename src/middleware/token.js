import { userConstants } from '../constants'
import { alertActions } from '../actions'
import config from '../config/default'
import { payloadFetch, setAccessToken, setRefreshToken } from '../utils'

export const refreshTokenMiddleware = ({
	dispatch,
	getState
}) => next => async action => {
	if (action.type !== userConstants.TOKENS_REQUEST) return next(action)

	if (typeof action.callAPI !== 'function')
		throw new Error('Expected callAPI to be a function')

	const { refreshToken } = getState()

	try {
		const response = await payloadFetch(`${config.api.url}/auth/refresh`, {
			refreshToken
		})
		const { newRefreshToken, newAccessToken } = await response.json()

		setRefreshToken(newRefreshToken)
		setAccessToken(newAccessToken)
		dispatch({
			type: userConstants.TOKENS_SUCCESS,
			newRefreshToken,
			newAccessToken
		})
		dispatch(alertActions.clear())
	} catch (responseError) {
		dispatch({
			type: userConstants.TOKENS_FAILURE
		})
		dispatch(alertActions.error(responseError.statusText))
	}
}
