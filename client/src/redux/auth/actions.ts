import { User } from '../../types'

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGGED_OUT = 'LOGGED_OUT'

export function loginSuccess(user: User): LoginSuccessType {
  return {
    type: LOGIN_SUCCESSFUL,
    payload: user,
  }
}

export function logout(): Logout {
  return {
    type: LOGGED_OUT,
  }
}

type LoginSuccessType = {
  type: typeof LOGIN_SUCCESSFUL
  payload: User
}

type Logout = {
  type: typeof LOGGED_OUT
}

export type AuthActions =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logout>
