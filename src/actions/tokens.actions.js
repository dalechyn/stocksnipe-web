import { tokensService } from '../services'
import { tokensConstants } from '../constants'
import { alertActions } from './alert.actions'

const getNewTokens = refreshToken => async dispatch => {
	const request = refreshToken => ({
		type: tokensConstants.TOKENS_REQUEST,
		refreshToken,
		tokensRefreshing: true
	})
	const success = () => async dispatch =>
		dispatch({
			type: tokensConstants.TOKENS_SUCCESS,
			...(await tokensService.getNewTokens(refreshToken))
		})
	const failure = () => ({ type: tokensConstants.TOKENS_FAILURE })

	dispatch(request(refreshToken))
	try {
		await dispatch(success())
	} catch (err) {
		dispatch(failure())
		dispatch(alertActions.error(err.statusText))
	}
}

export const tokensActions = {
	getNewTokens
}
