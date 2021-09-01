import { combineReducers } from 'redux'

import { authReducer } from './auth.slice'

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
  authReducer,
})

export default rootReducer
