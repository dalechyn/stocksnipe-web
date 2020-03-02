import config from '../config/default'
import { authHeader } from '../helpers'

const reqHandler = (text, response) =>
	response.ok ? text && JSON.parse(text) : Promise.reject(text || response.statusText)

const register = (userEmail, userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: userEmail, login: userLogin, password: userPassword })
	}

	return fetch(`${config.api.url}/users/register`, requestOptions).then(response =>
		response.text().then(text => reqHandler(text, response))
	)
}

const login = (userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ login: userLogin, password: userPassword })
	}

	return fetch(`${config.api.url}/users/login`, requestOptions)
		.then(response => response.text().then(text => reqHandler(text, response)))
		.then(user => localStorage.setItem('user', JSON.stringify(user)))
}

const logout = () => {
	// remove user from local storage to log user out
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
	getAll
}
