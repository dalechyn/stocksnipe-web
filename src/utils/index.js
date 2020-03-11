import decode from 'jwt-decode'
import { authHeader } from '../helpers'

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

export const checkTokenExpired = token => {
	try {
		const { exp } = decode(token)
		if (exp && exp < new Date().getTime() / 1000) {
			return true
		}
	} catch (e) {
		return true
	}
	return false
}

export const getAccessToken = () => localStorage.getItem('accessToken')

export const setAccessToken = token => localStorage.setItem('accessToken', token)

export const getRefreshToken = () => localStorage.getItem('refreshToken')

export const setRefreshToken = token => localStorage.setItem('refreshToken', token)

export const setUser = user => localStorage.setItem('user', user)
export const getUser = user => localStorage.getItem('user')

export const checkAccess = () => {
	const accessToken = getAccessToken()
	const refreshToken = getRefreshToken()

	if (!accessToken || !refreshToken) {
		return false
	}

	return !checkTokenExpired(accessToken)
}

const makeHeaders = headers => ({
	...headers,
	...authHeader()
})

export const removeUserAndTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('user')
}

export const payloadFetch = async (url, payload) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
	if (!res.ok) throw res

	return res
}
