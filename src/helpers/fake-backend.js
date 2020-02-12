export function configureFakeBackend() {
	const users = [
		{ id: 1, email: 'test@test', password: 'test', firstName: 'Test', lastName: 'User' }
	]
	const realFetch = window.fetch
	window.fetch = function(url, opts) {
		return new Promise((resolve, reject) => {
			// wrap in timeout to simulate server api call
			setTimeout(() => {
				// authenticate
				if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
					// get parameters from post request
					const params = JSON.parse(opts.body)

					// find if any user matches login credentials
					const filteredUsers = users.filter(user => {
						return user.email === params.email && user.password === params.password
					})

					if (filteredUsers.length) {
						// if login details are valid return user details and fake jwt token
						const user = filteredUsers[0]
						const responseJson = {
							id: user.id,
							email: user.email,
							firstName: user.firstName,
							lastName: user.lastName,
							token: 'fake-jwt-token'
						}
						resolve({
							ok: true,
							text: () => Promise.resolve(JSON.stringify(responseJson))
						})
					} else {
						// else return error
						reject('Username or password is incorrect')
					}

					return
				}

				// get users
				if (url.endsWith('/users') && opts.method === 'GET') {
					// check for fake auth token in header and return users if valid, this security is implemented server side in a real application
					if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
						resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) })
					} else {
						// return 401 not authorised if token is null or invalid
						reject('Unauthorised')
					}

					return
				}

				// pass through any requests not handled above
				realFetch(url, opts).then(response => resolve(response))
			}, 500)
		})
	}
}
