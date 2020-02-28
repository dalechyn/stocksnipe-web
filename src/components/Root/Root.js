import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import {
	ThemeProvider,
	CssBaseline,
	createMuiTheme,
	useMediaQuery
} from '@material-ui/core'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Main from '../pages/Main'
import { history } from '../helpers'

const Root = props => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light'
				}
			}),
		[prefersDarkMode]
	)

	return (
		<Provider store={props.store}>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Router history={history}>
					<Header />
					<Main />
				</Router>
			</ThemeProvider>
		</Provider>
	)
}

Root.propTypes = {
	store: PropTypes.object.isRequired
}

export default Root
