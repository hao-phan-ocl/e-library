import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer'

// Check token
// This to make sure user stayed authenticated
// and wont be redirect to '/' when F5 due to logic from PrivateRoutes
let hasAccessToken = false
if (localStorage.getItem('access_token')) {
  hasAccessToken = true
}

const initialState: RootState = {
  auth: {
    isAuthenticated: hasAccessToken,
    user: null,
  },
  book: {
    loading: true,
  },
  books: {
    books: [],
    loading: true,
  },
  dialog: {
    state: false,
  },
  authors: {
    authors: [],
  },
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
