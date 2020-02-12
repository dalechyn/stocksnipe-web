import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Form, FormGroup, Label, Button, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { history } from '../../helpers'
import { bindActionCreators } from 'redux'

import { alertActions, userActions } from '../../actions'

import './styles.scss'

const AuthForm = ({ alert, clear, logout, login }) => {
	logout()
	const { authRef, handleSubmit } = useForm()

	const onSubmit = ({ email, password }) => login(email, password)

	history.listen(() => {
		// clear alert on location change
		clear()
	})

	return (
		<div className='AuthForm'>
			{alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
			<Form className='AuthForm-content' onSubmit={handleSubmit(onSubmit)}>
				<FormGroup>
					<Label for='inputEmail'>Email</Label>
					<Input type='email' innerRef={authRef} name='email' placeholder='Enter Email' />
				</FormGroup>
				<FormGroup>
					<Label for='inputPass'>Password</Label>
					<Input
						type='password'
						innerRef={authRef}
						name='password'
						placeholder='Password'
					/>
				</FormGroup>
				<FormGroup check>
					<Label check>
						<Input
							type='checkbox'
							innerRef={authRef}
							name='remember'
							id='forgotCheckBox'
						/>
						Remember Me
					</Label>
				</FormGroup>
				<Button>Submit</Button>
			</Form>
		</div>
	)
}

AuthForm.propTypes = {
	alert: PropTypes.shape({
		message: PropTypes.object,
		type: PropTypes.string
	}),
	clear: PropTypes.func,
	login: PropTypes.func,
	logout: PropTypes.func
}

const mapStateToProps = ({ alert, loggingIn }) => ({ alert, loggingIn })

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			clear: alertActions.clear,
			logout: userActions.logout,
			login: userActions.login
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
