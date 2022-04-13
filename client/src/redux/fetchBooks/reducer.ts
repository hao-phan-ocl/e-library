import { Book } from '../../types/schema'
import {
  BOOKS_LOADING,
  FetchBooksActions,
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESSFUL,
} from '../../types/redux/fetchBooks'

type InitialState = {
  books: Book[]
  loading: boolean
  error?: Error
}

const initialState: InitialState = {
  books: [],
  loading: true,
}

export default function booksReducer(
  state = initialState,
  action: FetchBooksActions
): InitialState {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESSFUL:
      return {
        ...state,
        books: action.payload,
        loading: false,
      }

    case FETCH_BOOKS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case BOOKS_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}
