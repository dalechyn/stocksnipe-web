import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { callApiMiddleware } from './fetch'
import { alertMiddleware } from './alert'
import { handle401Middleware } from './handle401'

export default applyMiddleware(
	thunkMiddleware,
	callApiMiddleware,
	handle401Middleware,

	alertMiddleware,
	createLogger()
)
