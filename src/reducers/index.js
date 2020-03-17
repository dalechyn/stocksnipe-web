import { combineReducers } from 'redux'

import { auth } from './auth.reducer'
import { alert } from './alert.reducer'
import { tokens } from './tokens.reducer'
import { cabinet } from './cabinet.reducer'
import { react } from './react.reducer'

const rootReducer = combineReducers({
	auth,
	tokens,
	alert,
	cabinet,
	react
})

export default rootReducer
