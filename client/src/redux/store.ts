import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { User } from '../types'
import rootReducer, { RootState } from './rootReducer'

// Check current user
let currentUser: User | null

if (localStorage.getItem('current_user')) {
  currentUser = JSON.parse(localStorage.getItem('current_user') || '')
} else currentUser = null

const initialState: RootState = {
  auth: {
    isAuthenticated: currentUser ? true : false,
    user: currentUser,
    error: null,
  },
  book: {
    loading: true,
  },
  books: {
    books: [],
    loading: true,
  },
  modal: {
    state: false,
  },
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
  // User
  const user = store.getState().auth.user
  localStorage.setItem('current_user', JSON.stringify(user))
})

export default store
