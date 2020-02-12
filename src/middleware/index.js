import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default applyMiddleware(createLogger(), thunkMiddleware)
