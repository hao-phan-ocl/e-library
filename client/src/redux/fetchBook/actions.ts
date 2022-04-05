import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { Book } from '../../types'
import { RootState } from '../rootReducer'

export const FETCH_BOOK_SUCCESSFUL = 'FETCH_BOOK_SUCCESSFUL'
export const FETCH_BOOK_FAIL = 'FETCH_BOOK_FAIL'
export const BOOK_LOADING = 'BOOK_LOADING'

type GetState = () => RootState

export function fetchBook(bookId: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const book = getState().book.book

      if (book?._id !== bookId) {
        const res = await instance.get(request('books', 'id', bookId))
        dispatch(fetchBookSuccess(res.data))
        dispatch(loadingBook(false))
      }
    } catch (error) {
      dispatch(fetchBookFail(error as Error))
    }
  }
}

export function fetchBookSuccess(book: Book): FetchBookSuccessType {
  return {
    type: FETCH_BOOK_SUCCESSFUL,
    payload: book,
  }
}

export function fetchBookFail(err: Error): FetchBookFailType {
  return {
    type: FETCH_BOOK_FAIL,
    payload: err,
  }
}

export function loadingBook(status: boolean): LoadingBook {
  return {
    type: BOOK_LOADING,
    payload: status,
  }
}

type FetchBookSuccessType = {
  type: typeof FETCH_BOOK_SUCCESSFUL
  payload: Book
}

type FetchBookFailType = {
  type: typeof FETCH_BOOK_FAIL
  payload: Error
}

type LoadingBook = {
  type: typeof BOOK_LOADING
  payload: boolean
}

export type FetchBookActions =
  | ReturnType<typeof fetchBookSuccess>
  | ReturnType<typeof fetchBookFail>
  | ReturnType<typeof loadingBook>
