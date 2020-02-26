import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import AuthPage from '../Auth'
import { checkAuth } from '../../utils'
import Cabinet from '../Cabinet'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route
				path='/login'
				render={rProps =>
					checkAuth() ? <Cabinet {...rProps} /> : <AuthPage loginPage />
				}
			/>
			<Route
				path='/register'
				render={rProps =>
					checkAuth() ? <Cabinet {...rProps} /> : <AuthPage registerPage />
				}
			/>
		</Switch>
	</main>
)

export default Main
