import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { authActions } from './redux/auth.slice'
import rootReducers from './redux'

/* const initialState = {
  sidebarShow: false,
}
 */
//Redux Dev Tool Configuration
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

//Middleware to handle un-authorized web-service response
const authInterceptor =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.payload !== undefined && action.payload !== null && action.payload.status === 401) {
      dispatch(authActions.clearUserData())
    } else {
      next(action)
    }
  }

const enhancer = composeEnhancers(applyMiddleware(thunk, logger, authInterceptor))

/* function changeState(state = initialState, { type, ...rest }) {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
} */

const store = createStore(rootReducers, enhancer)

export default store
