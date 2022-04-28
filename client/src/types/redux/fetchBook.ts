import {
  fetchBookFail,
  fetchBookSuccess,
  loadingBook,
} from '../../redux/fetchBook/actions'
import { Book } from '../schema'

export const FETCH_BOOK_SUCCESSFUL = 'FETCH_BOOK_SUCCESSFUL'
export const FETCH_BOOK_FAIL = 'FETCH_BOOK_FAIL'
export const BOOK_LOADING = 'BOOK_LOADING'

export type FetchBookSuccessType = {
  type: typeof FETCH_BOOK_SUCCESSFUL
  payload: Book
}

export type FetchBookFailType = {
  type: typeof FETCH_BOOK_FAIL
  payload: Error
}

export type LoadingBook = {
  type: typeof BOOK_LOADING
  payload: boolean
}

export type FetchBookActions =
  | ReturnType<typeof fetchBookSuccess>
  | ReturnType<typeof fetchBookFail>
  | ReturnType<typeof loadingBook>
