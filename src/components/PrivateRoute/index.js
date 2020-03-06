import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
	checkAccess,
	checkTokenExpired,
	getAccessToken,
	getRefreshToken
} from '../../utils'
import { userActions } from '../../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const PrivateRoute = ({
	path,
	component: Component,
	renewTokenPair,
	tokensPromise,
	location,
	logout,
	...rest
}) => {
	useEffect(() => {
		const refreshToken = getRefreshToken()
		const accessToken = getAccessToken()

		if (!accessToken || !refreshToken || checkTokenExpired(refreshToken)) {
			logout()
			return (
				<Route
					{...rest}
					render={props => (
						<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
					)}
				/>
			)
		}

		if (checkTokenExpired(accessToken) && !tokensPromise) {
			renewTokenPair(refreshToken)
		}
	}, [])

	return (
		<Route
			path={path}
			{...rest}
			render={props =>
				tokensPromise ? null : checkAccess() ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	)
}

PrivateRoute.propTypes = {
	component: PropTypes.func,
	path: PropTypes.string,
	renewTokenPair: PropTypes.func,
	tokensPromise: PropTypes.func,
	logout: PropTypes.func,
	location: PropTypes.object
}

const mapStateToProps = ({ token: { tokensPromise } }) => ({ tokensPromise })

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			renewTokenPair: userActions.renewTokenPair,
			logout: userActions.logout
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
