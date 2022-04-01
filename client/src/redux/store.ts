import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { Book, User } from '../types'
import rootReducer, { RootState } from './rootReducer'

// Check current user
let currentUser: User | null

if (localStorage.getItem('current_user')) {
  currentUser = JSON.parse(localStorage.getItem('current_user') || '')
} else currentUser = null

// Check favorite books
let storedFavBooks: Book[]

if (localStorage.getItem('favBooks')) {
  storedFavBooks = JSON.parse(localStorage.getItem('favBooks') || '')
} else storedFavBooks = []

const initialState: RootState = {
  auth: {
    isAuthenticated: currentUser ? true : false,
    user: currentUser,
  },
  book: {
    loading: true,
  },
  books: {
    books: [],
    loading: true,
  },
  favBooks: {
    favBooks: storedFavBooks ? storedFavBooks : [],
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
  // Favorite books
  const favoriteState = store.getState().favBooks.favBooks
  localStorage.setItem('favBooks', JSON.stringify(favoriteState))
})

export default store
