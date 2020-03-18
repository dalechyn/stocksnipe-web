import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import {
	ThemeProvider,
	CssBaseline,
	createMuiTheme,
	useMediaQuery
} from '@material-ui/core'
import PropTypes from 'prop-types'

import Header from '../Header'
import Main from '../../pages/Main'

const Root = ({ store, history }) => {
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
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ConnectedRouter history={history}>
					<Header />
					<Main />
				</ConnectedRouter>
			</ThemeProvider>
		</Provider>
	)
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default Root
