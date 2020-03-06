import { combineReducers } from 'redux'

import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { token } from './token.reducer'

const rootReducer = combineReducers({
	auth,
	users,
	token,
	alert
})

export default rootReducer
