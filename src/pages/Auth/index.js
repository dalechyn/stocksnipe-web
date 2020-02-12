import React from 'react'
import AuthForm from '../../components/AuthForm'
import './styles.scss'

const AuthPage = () => (
	<section className='auth-page'>
		<div className='filler up' />
		<div className='auth-form'>
			<AuthForm />
		</div>
		<div className='filler down' />
	</section>
)

export default AuthPage
