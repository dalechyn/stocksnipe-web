import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Form, FormGroup } from 'reactstrap'
import { TextField, Button, Paper } from '@material-ui/core'
import { MUIRouterLink, MUIPasswordField } from '../../MUIComponents'
import { Alert } from '@material-ui/lab'
import PropTypes from 'prop-types'

import { history } from '../../../helpers'
import { alertActions, userActions } from '../../../actions'
import { passValidate } from '../utils'

import './styles.scss'

// eslint is mad on email regexps :P
// eslint-disable-next-line no-useless-escape
const emailRegExp = /^(?:(?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegisterForm = ({ alert, clearAlert, registerAction }) => {
	const { handleSubmit, control, errors, watch } = useForm({
		defaultValues: {
			inputEmail: '',
			inputLogin: '',
			inputPassword: '',
			inputConfirmPassword: ''
		}
	})

	const onSubmit = ({ inputEmail, inputLogin, inputPassword }) =>
		registerAction(inputEmail, inputLogin, inputPassword)

	history.listen(() => {
		// clear alert on location change
		clearAlert()
	})

	return (
		<Paper elevation={3} className='register-form'>
			<Form noValidate onSubmit={handleSubmit(onSubmit)}>
				{alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}
				<FormGroup>
					<Controller
						control={control}
						as={TextField}
						name='inputEmail'
						label='Email'
						type='email'
						rules={{
							required: 'Please fill out the email',
							validate: email => emailRegExp.test(email) || 'Invalid email format'
						}}
						variant='outlined'
						error={!!errors.inputEmail}
						helperText={errors.inputEmail && errors.inputEmail.message}
						fullWidth
					/>
				</FormGroup>
				<FormGroup>
					<Controller
						control={control}
						as={TextField}
						name='inputLogin'
						label='Login'
						rules={{ required: 'Please fill out the login' }}
						variant='outlined'
						error={!!errors.inputLogin}
						helperText={errors.inputLogin && errors.inputLogin.message}
						fullWidth
					/>
				</FormGroup>
				<FormGroup>
					<Controller
						control={control}
						as={MUIPasswordField}
						name='inputPassword'
						label='Password'
						rules={{ required: 'Please fill out the password', validate: passValidate }}
						variant='outlined'
						error={!!errors.inputPassword}
						helperText={errors.inputPassword && errors.inputPassword.message}
						fullWidth
					/>
				</FormGroup>
				<FormGroup>
					<Controller
						control={control}
						as={MUIPasswordField}
						name='inputConfirmPassword'
						label='Confirm password'
						rules={{
							required: 'Please confirm the password',
							validate: pass => pass === watch('inputPassword') || `Passwords don't match`
						}}
						variant='outlined'
						error={!!errors.inputConfirmPassword}
						helperText={
							errors.inputConfirmPassword && errors.inputConfirmPassword.message
						}
						fullWidth
					/>
				</FormGroup>
				<FormGroup>
					<Button type='submit' size='large' variant='outlined' color='primary' fullWidth>
						Register
					</Button>
				</FormGroup>
			</Form>
			<FormGroup>
				<div className='form-footer'>
					<div className='login-text'>Already registered?&nbsp;</div>
					<MUIRouterLink color='primary' to='/login'>
						Log In
					</MUIRouterLink>
				</div>
			</FormGroup>
		</Paper>
	)
}

RegisterForm.propTypes = {
	alert: PropTypes.shape({
		message: PropTypes.object,
		type: PropTypes.string
	}),
	clearAlert: PropTypes.func,
	registerAction: PropTypes.func
}

const mapStateToProps = ({ alert, registering }) => ({ alert, registering })

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			clearAlert: alertActions.clear,
			registerAction: userActions.register
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
