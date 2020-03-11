export const callApiMiddleware = ({ dispatch, getState }) => next => async action => {
	const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action

	if (!types)
		// Normal action: pass it on
		return next(action)

	if (
		!Array.isArray(types) ||
		types.length !== 3 ||
		!types.every(type => typeof type === 'string')
	)
		throw new Error('Expected an array of three string types.')

	if (typeof callAPI !== 'function') throw new Error('Expected callAPI to be a function.')

	if (!shouldCallAPI(getState())) return

	const [requestType, successType, failureType] = types

	dispatch({
		type: requestType,
		...payload
	})

	try {
		dispatch({
			type: successType,
			...payload,
			response: await callAPI(payload)
		})
	} catch (responseError) {
		dispatch({
			type: failureType,
			...payload,
			callAPI,
			responseError
		})
	}
}
