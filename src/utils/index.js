import decode from 'jwt-decode'
import { tokensActions } from '../actions'

export const createConstants = (...constants) => {
	let i = 0
	return constants.reduce((acc, constant) => {
		acc[constant] = i
		i++
		return acc
	}, {})
}

export const createReducer = (reducer, initState = {}) => {
	let state = initState
	return {
		dispatch(action) {
			state = reducer(state, action)
		},
		getState() {
			return state
		}
	}
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

export const removeUserAndTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('user')
}

export const payloadFetch = async (url, payload = {}, needsAccessToken = false) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			needsAccessToken
				? {
						...payload,
						accessToken: getAccessToken()
				  }
				: payload
		)
	})
	if (!res.ok) throw res

	return res
}

export const badPayloadError = (expected, got) =>
	new Error(`Bad payload passed. Expected { ${expected}, but got ${got}`)

export const fetchWithRetry = promiseThunk => async (dispatch, getState) => {
	const {
		tokens: { refreshToken }
	} = getState()
	try {
		await promiseThunk()
	} catch (e) {
		if (e.status === 401) {
			const refreshed = await dispatch(tokensActions.getNewTokens(refreshToken))
			// checking if refresh failed
			if (refreshed) await promiseThunk()
		} else throw e
	}
}
