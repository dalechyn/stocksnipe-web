import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
	TextField,
	Container,
	Button,
	Paper,
	Box,
	IconButton,
	makeStyles
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import PropTypes from 'prop-types'

import { MUIRouterLink, MUIPasswordField, MUILabeledCheckbox } from '../../MUIComponents'
import { alertActions, userActions } from '../../../actions'

import { passValidate } from '../utils'

const useStyles = makeStyles(theme => ({
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('xs')]: {
			flexFlow: 'column',
			alignItems: 'center'
		}
	},
	registerHolder: {
		display: 'flex'
	},
	formGroup: {
		marginBottom: theme.spacing(2)
	},
	progress: {
		padding: '-20px'
	}
}))

const LoginForm = ({ className, alert, clearAlert, loginAction }) => {
	useEffect(() => {
		clearAlert()
	}, [])

	const classes = useStyles()
	const { handleSubmit, control, errors } = useForm({
		defaultValues: {
			inputLogin: '',
			inputPassword: '',
			checkboxRemember: false
		}
	})

	const onSubmit = ({ inputLogin, inputPassword }) =>
		loginAction(inputLogin, inputPassword)

	return (
		<Container component={Paper} className={className} disableGutters maxWidth='xs'>
			<Container
				disableGutters
				maxWidth='sm'
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
						name='inputLogin'
						label='Login'
						rules={{
							required: 'Please fill out the login'
						}}
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
						type='password'
						rules={{ required: 'Please fill out the password', validate: passValidate }}
						variant='outlined'
						error={!!errors.inputPassword}
						helperText={errors.inputPassword && errors.inputPassword.message}
						inputProps={{ autoComplete: 'current-password' }}
						fullWidth
					/>
				</Box>
				<Box className={classes.formGroup}>
					<Controller
						control={control}
						as={MUILabeledCheckbox}
						name='checkboxRemember'
						color='primary'
						label='Remember Me'
					/>
				</Box>
				<Box className={classes.formGroup}>
					<Button
						type='submit'
						size='large'
						variant='outlined'
						color='primary'
						fullWidth
						autoFocus
					>
						LOG IN
					</Button>
				</Box>
			</Container>
			<Container disableGutters>
				<div className={classes.footer}>
					<MUIRouterLink color='primary' to='/forgot'>
						Forgot password?
					</MUIRouterLink>
					<div className={classes.registerHolder}>
						<div className='register-text'>Not registered?&nbsp;</div>
						<MUIRouterLink color='primary' to='/register'>
							Register
						</MUIRouterLink>
					</div>
				</div>
			</Container>
		</Container>
	)
}

LoginForm.propTypes = {
	className: PropTypes.string,
	alert: PropTypes.shape({
		message: PropTypes.string,
		type: PropTypes.string
	}),
	clearAlert: PropTypes.func,
	loginAction: PropTypes.func
}

const mapStateToProps = ({ alert }) => ({ alert })

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			clearAlert: alertActions.clear,
			loginAction: userActions.login
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
