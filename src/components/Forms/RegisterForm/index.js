import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	TextField,
	Button,
	Paper,
	makeStyles,
	Container,
	IconButton
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Close as CloseIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'

import { history } from '../../../helpers'
import { alertActions, userActions } from '../../../actions'
import { passValidate } from '../utils'
import { MUIRouterLink, MUIPasswordField } from '../../MUIComponents'

// eslint is mad on email regexps :P
// eslint-disable-next-line no-useless-escape
const emailRegExp = /^(?:(?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const useStyles = makeStyles(theme => ({
	footer: {
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: { flexFlow: 'column', alignItems: 'center' }
	},
	loginText: {
		flexGrow: 1
	},
	formGroup: { marginBottom: theme.spacing(2) }
}))

const RegisterForm = ({ className, alert, clearAlert, registerAction }) => {
	const classes = useStyles()

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

	return (
		<Container component={Paper} className={className} disableGutters maxWidth='xs'>
			<Container
				disableGutters
				component='form'
				noValidate
				onSubmit={handleSubmit(onSubmit)}
			>
				{alert.message && (
					<Box className={classes.formGroup}>
						<Alert
							variant='outlined'
							action={
								<IconButton
									aria-label='close'
									color='inherit'
									size='small'
									onClick={() => {
										clearAlert()
									}}
								>
									<CloseIcon fontSize='inherit' />
								</IconButton>
							}
							severity={alert.type}
						>
							<AlertTitle>Error</AlertTitle>
							{alert.message}
						</Alert>
					</Box>
				)}
				<Box className={classes.formGroup}>
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
						inputProps={{ autoComplete: 'email' }}
						fullWidth
					/>
				</Box>
				<Box className={classes.formGroup}>
					<Controller
						control={control}
						as={TextField}
						name='inputLogin'
						label='Login'
						rules={{ required: 'Please fill out the login' }}
						variant='outlined'
						error={!!errors.inputLogin}
						helperText={errors.inputLogin && errors.inputLogin.message}
						inputProps={{ autoComplete: 'username' }}
						fullWidth
					/>
				</Box>
				<Box className={classes.formGroup}>
					<Controller
						control={control}
						as={MUIPasswordField}
						name='inputPassword'
						label='Password'
						rules={{ required: 'Please fill out the password', validate: passValidate }}
						variant='outlined'
						error={!!errors.inputPassword}
						helperText={errors.inputPassword && errors.inputPassword.message}
						inputProps={{ autoComplete: 'section-pass new-password' }}
						fullWidth
					/>
				</Box>
				<Box className={classes.formGroup}>
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
						inputProps={{ autoComplete: 'section-pass new-password' }}
						fullWidth
					/>
				</Box>
				<Box className={classes.formGroup}>
					<Button type='submit' size='large' variant='outlined' color='primary' fullWidth>
						Register
					</Button>
				</Box>
			</Container>
			<Box className={classes.formGroup}>
				<div className={classes.footer}>
					<Box>Already registered?&nbsp;</Box>
					<MUIRouterLink color='primary' to='/login'>
						Log In
					</MUIRouterLink>
				</div>
			</Box>
		</Container>
	)
}

RegisterForm.propTypes = {
	className: PropTypes.string,
	alert: PropTypes.shape({
		message: PropTypes.string,
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
