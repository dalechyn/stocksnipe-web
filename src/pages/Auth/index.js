import React from 'react'
import { Container, LinearProgress, makeStyles } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexFlow: 'column',
		minHeight: '100vh'
	},
	auth: {
		display: 'flex',
		flexFlow: 'column',
		margin: 'auto',
		padding: '20px',
		flexShrink: 0,
		alignSelf: 'center'
	},
	filler: {
		minHeight: theme.spacing(4),
		height: theme.spacing(3)
	},
	up: {
		flexGrow: 1
	},
	down: {
		flexGrow: 2
	},
	progress: {
		marginTop: '-10px'
	}
}))

const AuthPage = ({ loginPage, registerPage, auth }) => {
	const classes = useStyles()

	return auth.loggedIn ? (
		<Redirect to='/' />
	) : (
		<Container className={classes.root}>
			<div className={cn(classes.filler, classes.up)} />
			{loginPage && <LoginForm className={classes.auth} />}
			{registerPage && <RegisterForm className={classes.auth} />}
			{auth.loggingIn && (
				<Container maxWidth='xs' disableGutters>
					<LinearProgress className={classes.progress} />
				</Container>
			)}
			<div className={cn(classes.filler, classes.down)} />
		</Container>
	)
}

const requiredPropsCheck = (props, propName, componentName) => {
	if (!props.loginPage && !props.registerPage) {
		return new Error(
			`One of 'loginPage' or 'registerPage' is required by '${componentName}' component.`
		)
	}
}

AuthPage.propTypes = {
	loginPage: requiredPropsCheck,
	registerPage: requiredPropsCheck,
	auth: PropTypes.object
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(AuthPage)
