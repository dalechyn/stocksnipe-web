import config from '../config/default'
import { authHeader } from '../helpers'

const register = (userEmail, userLogin, userPassword) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: userEmail, login: userLogin, password: userPassword })
	}

	return fetch(`${config.api.url}/users/register`, requestOptions).then(response =>
		response
			.text()
			.then(text => {
				const data = text && JSON.parse(text)
				return response.ok
					? data
					: Promise.reject((data && data.message) || response.statusText)
			})
			.then()
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
		.then(response =>
			response.text().then(text => {
				const data = text && JSON.parse(text)
				if (!response.ok) {
					if (response.status === 401) {
						// auto logout if 401 response returned from api
						logout()
						// why logout if we are not logged in
						// location.reload(true)
					}

					const error = (data && data.message) || response.statusText
					return Promise.reject(error)
				}

				return data
			})
		)
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
