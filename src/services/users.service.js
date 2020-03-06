import config from '../config/default'
import { removeUserAndTokens, setAccessToken, setRefreshToken, setUser } from '../utils'

const resHandler = async response => {
	if (!response.ok) throw response

	const text = await response.text()
	if (!text) throw new Error('JSON Body response is empty')

	return JSON.parse(text)
}

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
}

const register = async (userEmail, userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: userEmail, login: userLogin, password: userPassword })
	}

	await fetch(`${config.api.url}/auth/register`, requestOptions)
}

const login = async (userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ login: userLogin, password: userPassword })
	}

	const response = await fetch(`${config.api.url}/auth/login`, requestOptions)
	const { refreshToken, accessToken, ...rest } = await resHandler(response)

	setAccessToken(accessToken)
	setRefreshToken(refreshToken)
	setUser(JSON.stringify(rest))

	return rest
}

const logout = () => {
	removeUserAndTokens()
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
	refreshTokenPair,
	getAll
}
