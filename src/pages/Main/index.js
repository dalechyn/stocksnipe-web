import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import AuthPage from '../../pages/Auth'
import decode from 'jwt-decode'
import Cabinet from '../Cabinet'

const checkAuth = () => {
	const token = localStorage.getItem('token')
	const refreshToken = localStorage.getItem('refreshToken')

	if (!token || !refreshToken) {
		return false
	}

	try {
		const { exp } = decode(refreshToken)
		if (exp < new Date().getTime() / 1000) {
			return false
		}
	} catch (e) {
		return false
	}

	return true
}

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route
				path='/signin'
				render={rProps => (checkAuth() ? <Cabinet {...rProps} /> : <AuthPage />)}
			/>
		</Switch>
	</main>
)

export default Main
