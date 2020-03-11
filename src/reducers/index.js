import { combineReducers } from 'redux'

import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { tokens } from './token.reducer'

const rootReducer = combineReducers({
	auth,
	users,
	tokens,
	alert
})

export default rootReducer
