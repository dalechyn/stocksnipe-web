import { createStore } from 'redux'
import rootReducer from '../reducers'
import middleware from '../middleware'

export const store = createStore(rootReducer, middleware)
