import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import {
  BOOK_LOADING,
  FetchBookFailType,
  FetchBookSuccessType,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_SUCCESSFUL,
  LoadingBook,
} from '../../types/redux/fetchBook'
import { Book } from '../../types/schema'
import { RootState } from '../rootReducer'

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
