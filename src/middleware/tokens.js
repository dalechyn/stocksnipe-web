import decode from 'jwt-decode'
import { userActions } from '../actions'

export const autoRefreshTokens = ({ dispatch, getState }) => next => action => {
	// only worry about expiring token for async actions
	if (typeof action === 'function') {
		const state = getState()

		if (state.auth && state.auth.tokens && state.auth.tokens.refreshToken) {
			// decode jwt so that we know if and when it expires
			const { exp } = decode(state.auth.tokens.refreshToken)

			if (exp && exp < new Date().getTime() / 1000) {
				// make sure we are not already refreshing the token
				if (!state.auth.tokensPromise) {
					dispatch(userActions.getTokenPair(getState().auth.tokens.refreshToken))
					return next(action)
				} else return state.auth.tokensPromise.then(() => next(action))
			}
		}
	}
	return next(action)
}
