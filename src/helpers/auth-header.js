export const authHeader = () => {
	// return authorization header with jwt token
	const user = JSON.parse(localStorage.getItem('user'))

	return user && user.token ? { Authorization: 'Bearer ' + user.token } : {}
}
