import { User } from '../../types'
import {
  AuthActions,
  LOGGED_IN,
  LOGGED_OUT,
  BOOKLISTS_UPDATED_SUCCESSFULLY,
  BOOKLISTS_UPDATED_FAILED,
  USER_DELETED_SUCCESSFULLY,
  USER_DELETE_FAILED,
} from './actions'

export type InitialState = {
  isAuthenticated: boolean
  user: User | null
  error: Error | null
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
  error: null,
}

export default function authReducer(
  state = initialState,
  action: AuthActions
): InitialState {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }

    case LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }

    case BOOKLISTS_UPDATED_SUCCESSFULLY:
      return {
        ...state,
        user: action.payload,
      }

    case BOOKLISTS_UPDATED_FAILED:
      return {
        ...state,
        error: action.payload,
      }

    case USER_DELETED_SUCCESSFULLY:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }

    case USER_DELETE_FAILED:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}
