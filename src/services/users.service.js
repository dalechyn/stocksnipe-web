import config from '../config/default'
import {
	payloadFetch,
	removeUserAndTokens,
	setAccessToken,
	setRefreshToken,
	setUser
} from '../utils'
import { history } from '../helpers'

/*const resHandler = async response => {
	if (!response.ok) throw response

	const text = await response.text()
	if (!text) throw new Error('JSON Body response is empty')

	return JSON.parse(text)
}*/
/*
const refreshTokenPair = async oldRefreshToken => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refreshToken: oldRefreshToken })
	}

	const response = await fetch(`${config.api.url}/auth/refresh`, requestOptions)
	const { accessToken, refreshToken } = await resHandler(response)

	setAccessToken(accessToken)
	setRefreshToken(refreshToken)
}*/

const register = (userEmail, userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: userEmail, login: userLogin, password: userPassword })
	}

	return fetch(`${config.api.url}/auth/register`, requestOptions)
}

const login = dispatch => async (userLogin, userPassword) => {
	const res = await payloadFetch(`${config.api.url}/auth/login`, {
		login: userLogin,
		password: userPassword
	})

	const { refreshToken, accessToken, ...user } = await res.json()

	setRefreshToken(refreshToken)
	setAccessToken(accessToken)
	setUser(JSON.stringify(user))
}

const logout = () => {
	removeUserAndTokens()
	history.push('/')
}

const getAll = async () => {
	const requestOptions = {
		method: 'GET'
	}

	await fetch(`${config.api.url}/users`, requestOptions)
}

export const usersService = {
	register,
	login,
	logout,
	getAll
}
