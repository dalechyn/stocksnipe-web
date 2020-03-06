import config from '../config/default'
import { removeUserAndTokens, setAccessToken, setRefreshToken, setUser } from '../utils'

const resHandler = response => {
	return response.ok
		? Promise.resolve(response)
				.then(response => response.text())
				.then(text =>
					text
						? JSON.parse(text)
						: Promise.reject(new Error('JSON Body response is empty'))
				)
		: Promise.reject(response)
}

const refreshTokenPair = refreshToken => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refreshToken })
	}

	return fetch(`${config.api.url}/auth/refresh`, requestOptions)
		.then(resHandler)
		.then(({ accessToken, refreshToken }) => {
			setAccessToken(accessToken)
			setRefreshToken(refreshToken)
		})
}

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

const login = (userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ login: userLogin, password: userPassword })
	}

	return fetch(`${config.api.url}/auth/login`, requestOptions)
		.then(resHandler)
		.then(user => {
			console.log(user)
			const { refreshToken, accessToken, ...rest } = user

			setAccessToken(accessToken)
			setRefreshToken(refreshToken)
			setUser(JSON.stringify(rest))
		})
}

const logout = () => {
	removeUserAndTokens()
}

const getAll = () => {
	const requestOptions = {
		method: 'GET'
	}

	return fetch(`${config.api.url}/users`, requestOptions)
}

export const usersService = {
	register,
	login,
	logout,
	refreshTokenPair,
	getAll
}
