import { User } from '../../types'
import { AuthActions, LOGIN_SUCCESSFUL, LOGGED_OUT } from './actions'

export type InitialState = {
  isAuthenticated: boolean
  user: User | null
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
}

export default function authReducer(
  state = initialState,
  action: AuthActions
): InitialState {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
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

    default:
      return state
  }
}
