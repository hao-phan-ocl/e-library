import { Book } from '../../types'
import {
  BOOK_LOADING,
  FetchBookActions,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_SUCCESSFUL,
} from './actions'

type InitialState = {
  book?: Book
  loading: boolean
  error?: Error
}

const initialState: InitialState = {
  loading: true,
}

export default function bookReducer(
  state = initialState,
  action: FetchBookActions
): InitialState {
  switch (action.type) {
    case FETCH_BOOK_SUCCESSFUL:
      return {
        ...state,
        book: action.payload,
      }

    case FETCH_BOOK_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case BOOK_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}
