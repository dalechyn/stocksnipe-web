import { userConstants } from '../constants'
import config from '../config/default'

export const handle401Middleware = ({ dispatch, getState }) => next => async action => {
	// only worry about expiring token for async actions
	const { responseError } = action
	if (!responseError || responseError.status !== 401) return next(action)

	const {
		tokens: { tokensPromise, refreshToken }
	} = getState()

	if (!tokensPromise) {
		dispatch({
			type: userConstants.TOKENS_REQUEST,
			refreshTokensPromise: fetch(`${config.api.url}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ refreshToken })
			})
		})
	} else {
		await tokensPromise
	}

	return next(action)
}
