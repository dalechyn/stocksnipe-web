import decode from 'jwt-decode'

export const createConstants = (...constants) => {
	let i = 0
	return constants.reduce((acc, constant) => {
		acc[constant] = i
		i++
		return acc
	}, {})
}

export const createReducer = (initialState, reducerMap) => (
	state = initialState,
	action
) => {
	const reducer = reducerMap[action.type]
	return reducer ? reducer(state, action.payload) : state
}

export const parseJSON = response => response.json()

export const checkAccess = () => {
	const accessToken = localStorage.getItem('accessToken')
	const refreshToken = localStorage.getItem('refreshToken')

	if (!accessToken || !refreshToken) {
		return false
	}

	try {
		const { exp } = decode(accessToken)
		if (exp && exp < new Date().getTime() / 1000) {
			return false
		}
	} catch (e) {
		return false
	}

	return true
}
