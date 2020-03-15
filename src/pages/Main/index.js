import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../Home'
import AuthPage from '../Auth'
import { checkAccess } from '../../utils'
import Cabinet from '../Cabinet'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route
				path='/login'
				render={() =>
					checkAccess() ? <Redirect to='/cabinet' /> : <AuthPage loginPage />
				}
			/>
			<Route
				path='/register'
				render={() =>
					checkAccess() ? <Redirect to='/cabinet' /> : <AuthPage registerPage />
				}
			/>
			<Route path='/cabinet' component={Cabinet} />
		</Switch>
	</main>
)

export default Main
