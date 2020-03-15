import { combineReducers } from 'redux'

import { auth } from './auth.reducer'
import { alert } from './alert.reducer'
import { tokens } from './tokens.reducer'
import { cabinet } from './cabinet.reducer'

const rootReducer = combineReducers({
	auth,
	tokens,
	alert,
	cabinet
})

export default rootReducer
