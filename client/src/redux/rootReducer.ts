import { combineReducers } from 'redux'

import authReducer from './auth/reducer'
import booksReducer from './fetchBooks/reducer'
import bookReducer from './fetchBook/reducer'
import modalReducer from './modal/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  books: booksReducer,
  modal: modalReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
