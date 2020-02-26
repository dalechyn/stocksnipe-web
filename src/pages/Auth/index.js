import React from 'react'

import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'

import './styles.scss'

const AuthPage = ({ loginPage, registerPage }) => (
	<section className='auth-page'>
		<div className='filler up' />
		<div className='auth-form'>
			{loginPage && <LoginForm />}
			{registerPage && <RegisterForm />}
		</div>
		<div className='filler down' />
	</section>
)

const requiredPropsCheck = (props, propName, componentName) => {
	if (!props.loginPage && !props.registerPage) {
		return new Error(
			`One of 'loginPage' or 'registerPage' is required by '${componentName}' component.`
		)
	}
}
AuthPage.propTypes = {
	loginPage: requiredPropsCheck,
	registerPage: requiredPropsCheck
}

export default AuthPage
