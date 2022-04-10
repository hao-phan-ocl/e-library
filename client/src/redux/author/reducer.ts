import { Author } from '../../types'
import {
  AUTHORS_LIST,
  SearchAuthorActions,
  SEARCH_AUTHOR_FAILED,
} from './action'

type InitialState = {
  authors: Author[]
  error?: Error
}

const initialState: InitialState = {
  authors: [],
}

export default function authorReducer(
  state = initialState,
  action: SearchAuthorActions
): InitialState {
  switch (action.type) {
    case AUTHORS_LIST:
      return {
        ...state,
        authors: action.payload,
      }

    case SEARCH_AUTHOR_FAILED:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}
