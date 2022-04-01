import { Book } from '../../types'
import { ADD_FAVOURITE, FavoriteActions, REMOVE_FAVOURITE } from './actions'

export type InitialState = {
  favBooks: Book[]
}

const initialState: InitialState = {
  favBooks: [],
}

function favoriteReducer(
  state = initialState,
  action: FavoriteActions
): InitialState {
  switch (action.type) {
    case ADD_FAVOURITE:
      const existed = state.favBooks.find(
        (book) => book._id === action.payload._id
      )

      if (existed) {
        return state
      }

      return {
        ...state,
        favBooks: [...state.favBooks, action.payload],
      }
    case REMOVE_FAVOURITE:
      const filtered = state.favBooks.filter(
        (book) => book._id !== action.payload._id
      )
      return {
        ...state,
        favBooks: filtered,
      }
    default:
      return state
  }
}

export default favoriteReducer
