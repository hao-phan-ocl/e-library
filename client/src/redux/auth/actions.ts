import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { User } from '../../types'

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const BOOKLISTS_UPDATED_SUCCESSFULLY = 'BOOKLISTS_UPDATED_SUCCESSFULLY'
export const BOOKLISTS_UPDATED_FAILED = 'BOOKLISTS_UPDATED_FAILED'
export const USER_DELETED_SUCCESSFULLY = 'USER_DELETED_SUCCESSFULLY'
export const USER_DELETE_FAILED = 'USER_DELETE_FAILED'

// LOGGIN
export function loginSuccess(user: User): LoginSuccessType {
  return {
    type: LOGGED_IN,
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
      console.log(res.data)
      dispatch(updateFavSuccess(res.data))
    } catch (error) {
      dispatch(updateFavFail(error as Error))
    }
  }
}

// DELETE
export function deleteUser(userId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await instance.delete(request('users', 'delete', userId))
      if (res.status === 204) {
        dispatch(deleteSuccess())
      }
    } catch (error) {
      dispatch(deleteFail(error as Error))
    }
  }
}

function updateFavSuccess(updatedUser: User): FavoriteSuccessType {
  return {
    type: BOOKLISTS_UPDATED_SUCCESSFULLY,
    payload: updatedUser,
  }
}

function updateFavFail(error: Error): FavoriteFailType {
  return {
    type: BOOKLISTS_UPDATED_FAILED,
    payload: error,
  }
}

function deleteSuccess(): DeleteSuccessType {
  return {
    type: USER_DELETED_SUCCESSFULLY,
  }
}

function deleteFail(error: Error): DeleteFailType {
  return {
    type: USER_DELETE_FAILED,
    payload: error,
  }
}

type LoginSuccessType = {
  type: typeof LOGGED_IN
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

type DeleteSuccessType = {
  type: typeof USER_DELETED_SUCCESSFULLY
}

type DeleteFailType = {
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
