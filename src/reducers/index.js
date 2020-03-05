import { combineReducers } from 'redux'

import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
	auth,
	users,
	alert
})

export default rootReducer
