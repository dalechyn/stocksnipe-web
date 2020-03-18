import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'
import createMiddleware from '../middleware'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const configureStore = preloadedState =>
	createStore(
		rootReducer(history),
		preloadedState,
		composeWithDevTools(createMiddleware(history))
	)
