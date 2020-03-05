import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { autoRefreshTokens } from './tokens'

export default applyMiddleware(autoRefreshTokens, thunkMiddleware, createLogger())
