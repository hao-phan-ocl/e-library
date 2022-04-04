import { combineReducers } from 'redux'

import authReducer from './auth/reducer'
import booksReducer from './fetchBooks/reducer'
import bookReducer from './fetchBook/reducer'
import dialogReducer from './dialog/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  books: booksReducer,
  dialog: dialogReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
