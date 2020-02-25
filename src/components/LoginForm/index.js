import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Form, FormGroup } from 'reactstrap'
import { TextField, Checkbox, Button, Paper } from '@material-ui/core'
import MUIRouterLink from '../MUIRouterLink'
import { Alert } from '@material-ui/lab'
import PropTypes from 'prop-types'

import { history } from '../../helpers'
import { alertActions, userActions } from '../../actions'

import './styles.scss'

const LoginForm = ({ alert, clearAlert, loginAction }) => {
	const { handleSubmit, control, errors } = useForm({
		defaultValues: {
			inputLogin: '',
			inputPassword: '',
			checkboxRemember: true
		}
	})

	const onSubmit = ({ inputLogin, inputPassword }) =>
		loginAction(inputLogin, inputPassword)

	history.listen(() => {
		// clear alert on location change
		clearAlert()
	})

	return (
		<Paper elevation={3} className='login-form'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}
				<FormGroup>
					<Controller
						control={control}
						as={<TextField />}
						name='inputLogin'
						rules={{ required: 'Please fill out the Login' }}
						variant='outlined'
						error={!!errors.inputLogin}
						helperText={errors.inputLogin && errors.inputLogin.message}
						fullWidth
					/>
				</FormGroup>
				<FormGroup>
					<Controller
						control={control}
						as={<TextField />}
						name='inputPassword'
						type='password'
						rules={{ required: 'Please fill out the Password' }}
						variant='outlined'
						error={!!errors.inputPassword}
						helperText={errors.inputPassword && errors.inputPassword.message}
						fullWidth
					/>
				</FormGroup>
				<FormGroup>
					<Controller
						control={control}
						as={<Checkbox />}
						name='checkboxRemember'
						color='primary'
					/>
					<label>Remember Me</label>
				</FormGroup>
				<FormGroup>
					<Button type='submit' variant='outlined' color='primary' fullWidth>
						Submit
					</Button>
				</FormGroup>
			</Form>
			<FormGroup>
				<div className='form-footer'>
					<MUIRouterLink color='primary' to='/forgot'>
						Forgot password?
					</MUIRouterLink>
					<div className='register-holder'>
						<div className='register-text'>Not registered?&nbsp;</div>
						<MUIRouterLink color='primary' to='/register'>
							Register
						</MUIRouterLink>
					</div>
				</div>
			</FormGroup>
		</Paper>
	)
}

LoginForm.propTypes = {
	alert: PropTypes.shape({
		message: PropTypes.object,
		type: PropTypes.string
	}),
	clearAlert: PropTypes.func,
	loginAction: PropTypes.func,
	logoutAction: PropTypes.func
}

const mapStateToProps = ({ alert, loggingIn }) => ({ alert, loggingIn })

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			clearAlert: alertActions.clear,
			logoutAction: userActions.logout,
			loginAction: userActions.login
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
