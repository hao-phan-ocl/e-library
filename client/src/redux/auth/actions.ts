import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { User } from '../../types'

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGGED_OUT = 'LOGGED_OUT'
export const BOOKLISTS_UPDATED_SUCCESSFULLY = 'BOOKLISTS_UPDATED_SUCCESSFULLY'
export const BOOKLISTS_UPDATED_FAILED = 'BOOKLISTS_UPDATED_FAILED'

// LOGGIN
export function loginSuccess(user: User): LoginSuccessType {
  return {
    type: LOGIN_SUCCESSFUL,
    payload: user,
  }
}

// LOGOUT
export function logout(): Logout {
  return {
    type: LOGGED_OUT,
  }
}

// ADD
export function addFavorite(userId: string, bookId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await instance.put<User>(request('users', 'add-books'), {
        userId: userId,
        bookId: bookId,
      })
      console.log(res.data)
      dispatch(updateFavSuccess(res.data))
    } catch (error) {
      dispatch(updateFavFail(error as Error))
    }
  }
}

// REMOVE
export function removeFavorite(userId: string, bookId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await instance.put<User>(request('users', 'delete-books'), {
        userId: userId,
        bookId: bookId,
      })
      dispatch(updateFavSuccess(res.data))
    } catch (error) {
      dispatch(updateFavFail(error as Error))
    }
  }
}

function updateFavSuccess(user: User): FavoriteSuccessType {
  return {
    type: BOOKLISTS_UPDATED_SUCCESSFULLY,
    payload: user,
  }
}

function updateFavFail(error: Error): FavoriteFailType {
  return {
    type: BOOKLISTS_UPDATED_FAILED,
    payload: error,
  }
}

type LoginSuccessType = {
  type: typeof LOGIN_SUCCESSFUL
  payload: User
}

type Logout = {
  type: typeof LOGGED_OUT
}

type FavoriteSuccessType = {
  type: typeof BOOKLISTS_UPDATED_SUCCESSFULLY
  payload: User
}

type FavoriteFailType = {
  type: typeof BOOKLISTS_UPDATED_FAILED
  payload: Error
}

export type AuthActions =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logout>
  | ReturnType<typeof updateFavSuccess>
  | ReturnType<typeof updateFavFail>
