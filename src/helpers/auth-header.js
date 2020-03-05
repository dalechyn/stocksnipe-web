export const authHeader = () => {
	// return authorization header with jwt token
	const accessToken = localStorage.getItem('accessToken')

	return accessToken ? { Authorization: 'Bearer ' + accessToken } : {}
}
