import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import {
  BOOKS_LOADING,
  FetchBooksFailType,
  FetchBooksSuccessType,
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESSFUL,
  LoadingBooks,
} from '../../types/redux/fetchBooks'
import { Book } from '../../types/schema'
import { RootState } from '../rootReducer'

type GetState = () => RootState

export function fetchBooks() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const books = getState().books.books

      if (!books.length) {
        const res = await instance.get(request('books', 'all'))
        dispatch(fetchBooksSuccess(res.data))
        dispatch(loadingBooks(false))
      }
    } catch (error) {
      dispatch(fetchBooksFail(error as Error))
    }
  }
}

export function fetchBooksSuccess(books: Book[]): FetchBooksSuccessType {
  return {
    type: FETCH_BOOKS_SUCCESSFUL,
    payload: books,
  }
}

export function fetchBooksFail(err: Error): FetchBooksFailType {
  return {
    type: FETCH_BOOKS_FAIL,
    payload: err,
  }
}

export function loadingBooks(status: boolean): LoadingBooks {
  return {
    type: BOOKS_LOADING,
    payload: status,
  }
}
