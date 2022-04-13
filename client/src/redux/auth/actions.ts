import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import {
  BOOKLISTS_UPDATED_FAILED,
  BOOKLISTS_UPDATED_SUCCESSFULLY,
  DeleteFailType,
  DeleteSuccessType,
  FavoriteFailType,
  FavoriteSuccessType,
  LOGGED_IN,
  LOGGED_OUT,
  LoginFailType,
  LoginSuccessType,
  LOGIN_FAILED,
  Logout,
  USER_DELETED_SUCCESSFULLY,
  USER_DELETE_FAILED,
} from '../../types/redux/auth'
import { User } from '../../types/schema'
import { RootState } from '../rootReducer'

type GetState = () => RootState

// LOGGIN
export function loginSuccess(user: User): LoginSuccessType {
  return {
    type: LOGGED_IN,
    payload: user,
  }
}

export function loginFail(err: Error): LoginFailType {
  return {
    type: LOGIN_FAILED,
    payload: err,
  }
}

// LOGOUT
export function logout(): Logout {
  return {
    type: LOGGED_OUT,
  }
}

// GET PROFILE
export default function getProfile() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const hasAccessToken = getState().auth.isAuthenticated

      if (hasAccessToken) {
        const res = await instance.get<User>(request('users', 'profile'))
        dispatch(loginSuccess(res.data))
      }
    } catch (error) {
      dispatch(loginFail(error as Error))
    }
  }
}

// ADD
export function addFavorite(bookId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await instance.put<User>(request('users', 'add-favorite'), {
        bookId: bookId,
      })

      dispatch(updateFavSuccess(res.data))
    } catch (error) {
      dispatch(updateFavFail(error as Error))
    }
  }
}

// REMOVE
export function removeFavorite(bookId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await instance.put<User>(
        request('users', 'delete-favorite'),
        {
          bookId: bookId,
        }
      )
      dispatch(updateFavSuccess(res.data))
    } catch (error) {
      dispatch(updateFavFail(error as Error))
    }
  }
}

// DELETE
export function deleteUser() {
  return async (dispatch: Dispatch) => {
    try {
      const res = await instance.delete(request('users', 'delete'))
      if (res.status === 204) {
        dispatch(deleteSuccess())
      }
    } catch (error) {
      dispatch(deleteFail(error as Error))
    }
  }
}

export function updateFavSuccess(updatedUser: User): FavoriteSuccessType {
  return {
    type: BOOKLISTS_UPDATED_SUCCESSFULLY,
    payload: updatedUser,
  }
}

export function updateFavFail(error: Error): FavoriteFailType {
  return {
    type: BOOKLISTS_UPDATED_FAILED,
    payload: error,
  }
}

export function deleteSuccess(): DeleteSuccessType {
  return {
    type: USER_DELETED_SUCCESSFULLY,
  }
}

export function deleteFail(error: Error): DeleteFailType {
  return {
    type: USER_DELETE_FAILED,
    payload: error,
  }
}
