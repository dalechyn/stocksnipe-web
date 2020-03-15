import { tokensConstants } from '../constants'
import { tokensActions } from '../actions/tokens.actions'

export const handle401Middleware = ({ dispatch, getState }) => next => async action => {
	const { responseError, tokensRefreshed, type } = action
	if (
		type === tokensConstants.TOKENS_REQUEST || // we don't retry token request
		tokensRefreshed || // if tokens just refreshed don't fall in refresh loop
		!responseError || // if isn't a request error
		responseError.status !== 401
	)
		return next(action)

	const {
		tokens: { tokensRefreshing, refreshToken }
	} = getState()

	// refresh tokens only once
	if (!tokensRefreshing) {
		// renew tokens
		await dispatch(tokensActions.getNewTokens(refreshToken))
	}

	// retry request
	dispatch({
		...action.requestPayload,
		tokensRefreshed: true
	})
}
