import { alertConstants } from '../constants'

export const alertMiddleware = ({ dispatch }) => next => action => {
	// if the action was a fetch action, checking if it has response or error
	const { response, responseError } = action

	// if those not exist, pass on
	if (!response && !responseError) return next(action)

	if (responseError)
		dispatch({
			type: alertConstants.ERROR,
			message: responseError.statusText
		})
	else if (response)
		dispatch({
			type: alertConstants.CLEAR
		})

	return next(action)
}
