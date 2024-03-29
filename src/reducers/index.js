import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reactFetcher } from 'react-redux-fetcher'

import { auth } from './auth.reducer'
import { alert } from './alert.reducer'
import { tokens } from './tokens.reducer'
import { cabinet } from './cabinet.reducer'
import { react } from './react.reducer'

const rootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		reactFetcher,
		auth,
		tokens,
		alert,
		cabinet,
		react
	})

export default rootReducer
