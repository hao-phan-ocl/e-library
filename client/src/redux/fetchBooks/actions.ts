import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { Book } from '../../types'
import { RootState } from '../rootReducer'

export const FETCH_BOOKS_SUCCESSFUL = 'FETCH_BOOKS_SUCCESSFUL'
export const FETCH_BOOKS_FAIL = 'FETCH_BOOKS_FAIL'
export const BOOK_LOADING = 'BOOK_LOADING'

type GetState = () => RootState

export function fetchBooks() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      // const books = getState().books.books

      // if (!books.length) {
      const res = await instance.get(request('books', 'all'))
      dispatch(fetchBooksSuccess(res.data))
      dispatch(loadingBooks(false))
      // }
    } catch (error) {
      dispatch(fetchBooksFail(error as Error))
    }
  }
}

function fetchBooksSuccess(books: Book[]): FetchBooksSuccessType {
  return {
    type: FETCH_BOOKS_SUCCESSFUL,
    payload: books,
  }
}

function fetchBooksFail(err: Error): FetchBooksFailType {
  return {
    type: FETCH_BOOKS_FAIL,
    payload: err,
  }
}

export function loadingBooks(status: boolean): LoadingBooks {
  return {
    type: BOOK_LOADING,
    payload: status,
  }
}

type FetchBooksSuccessType = {
  type: typeof FETCH_BOOKS_SUCCESSFUL
  payload: Book[]
}

type FetchBooksFailType = {
  type: typeof FETCH_BOOKS_FAIL
  payload: Error
}

type LoadingBooks = {
  type: typeof BOOK_LOADING
  payload: boolean
}

export type FetchBooksActions =
  | ReturnType<typeof fetchBooksSuccess>
  | ReturnType<typeof fetchBooksFail>
  | ReturnType<typeof loadingBooks>
