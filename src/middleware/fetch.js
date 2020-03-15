export const callApiMiddleware = ({ dispatch, getState }) => next => async action => {
	const { types, callAPI, shouldCallAPI = () => true, payload = {}, ...rest } = action

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
		const res = await callAPI(payload)
		dispatch({
			type: successType,
			requestPayload: {
				types,
				payload
			},
			response: res ? await res.json() : res,
			...rest
		})
	} catch (responseError) {
		dispatch({
			type: failureType,
			requestPayload: {
				types,
				payload,
				callAPI
			},
			responseError,
			...rest
		})
	}
}
