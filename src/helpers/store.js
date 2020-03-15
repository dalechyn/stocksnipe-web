import { createStore } from 'redux'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import middleware from '../middleware'

export const store = createStore(rootReducer, composeWithDevTools(middleware))
