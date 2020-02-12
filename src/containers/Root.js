import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Main from '../pages/Main'
import { history } from '../helpers'

const Root = props => (
	<Provider store={props.store}>
		<Router history={history}>
			<Header />
			<Main />
		</Router>
	</Provider>
)

Root.propTypes = {
	store: PropTypes.object.isRequired
}

export default Root
