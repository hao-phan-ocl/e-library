import {
  fetchBooksFail,
  fetchBooksSuccess,
  loadingBooks,
} from '../../redux/fetchBooks/actions'
import { Book } from '../schema'

export const FETCH_BOOKS_SUCCESSFUL = 'FETCH_BOOKS_SUCCESSFUL'
export const FETCH_BOOKS_FAIL = 'FETCH_BOOKS_FAIL'
export const BOOKS_LOADING = 'BOOKS_LOADING'

export type FetchBooksSuccessType = {
  type: typeof FETCH_BOOKS_SUCCESSFUL
  payload: Book[]
}

export type FetchBooksFailType = {
  type: typeof FETCH_BOOKS_FAIL
  payload: Error
}

export type LoadingBooks = {
  type: typeof BOOKS_LOADING
  payload: boolean
}

export type FetchBooksActions =
  | ReturnType<typeof fetchBooksSuccess>
  | ReturnType<typeof fetchBooksFail>
  | ReturnType<typeof loadingBooks>
