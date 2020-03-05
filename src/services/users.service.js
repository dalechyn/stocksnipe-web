import config from '../config/default'
import { authHeader } from '../helpers'

const makeHeaders = headers => ({
	...headers,
	...authHeader()
})

const reqHandler = (text, response) =>
	response.ok ? text && JSON.parse(text) : Promise.reject(text || response.statusText)

const getTokenPair = refreshToken => {
	const requestOptions = {
		method: 'POST',
		headers: makeHeaders({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ refreshToken })
	}

	return fetch(`${config.api.url}/auth/refresh`, requestOptions).then(response =>
		response
			.text()
			.then(text => reqHandler(text, response))
			.then((accessToken, refreshToken) => {
				localStorage.setItem('accessToken', accessToken)
				localStorage.setItem('refreshToken', refreshToken)
			})
	)
}

const register = (userEmail, userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: makeHeaders({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ email: userEmail, login: userLogin, password: userPassword })
	}

	return fetch(`${config.api.url}/auth/register`, requestOptions)
}

const login = (userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: makeHeaders({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ login: userLogin, password: userPassword })
	}

	return fetch(`${config.api.url}/auth/login`, requestOptions)
		.then(response => response.text().then(text => reqHandler(text, response)))
		.then(user => {
			const { refreshToken, accessToken, ...rest } = user

			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('user', JSON.stringify(rest))
		})
}

const logout = () => {
	// remove access refresh tokens from local storage to log user out
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('user')
}

const getAll = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	}

	return fetch(`${config.api.url}/users`, requestOptions)
}

export const usersService = {
	register,
	login,
	logout,
	getTokenPair,
	getAll
}
