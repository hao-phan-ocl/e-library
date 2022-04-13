import {
  deleteFail,
  deleteSuccess,
  loginFail,
  loginSuccess,
  logout,
  updateFavFail,
  updateFavSuccess,
} from '../../redux/auth/actions'
import { User } from '../schema'

export const LOGGED_IN = 'LOGGED_IN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGGED_OUT = 'LOGGED_OUT'
export const BOOKLISTS_UPDATED_SUCCESSFULLY = 'BOOKLISTS_UPDATED_SUCCESSFULLY'
export const BOOKLISTS_UPDATED_FAILED = 'BOOKLISTS_UPDATED_FAILED'
export const USER_DELETED_SUCCESSFULLY = 'USER_DELETED_SUCCESSFULLY'
export const USER_DELETE_FAILED = 'USER_DELETE_FAILED'

export type LoginSuccessType = {
  type: typeof LOGGED_IN
  payload: User
}

export type LoginFailType = {
  type: typeof LOGIN_FAILED
  payload: Error
}

export type Logout = {
  type: typeof LOGGED_OUT
}

export type FavoriteSuccessType = {
  type: typeof BOOKLISTS_UPDATED_SUCCESSFULLY
  payload: User
}

export type FavoriteFailType = {
  type: typeof BOOKLISTS_UPDATED_FAILED
  payload: Error
}

export type DeleteSuccessType = {
  type: typeof USER_DELETED_SUCCESSFULLY
}

export type DeleteFailType = {
  type: typeof USER_DELETE_FAILED
  payload: Error
}

export type AuthActions =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logout>
  | ReturnType<typeof updateFavSuccess>
  | ReturnType<typeof updateFavFail>
  | ReturnType<typeof deleteSuccess>
  | ReturnType<typeof deleteFail>
  | ReturnType<typeof loginFail>
