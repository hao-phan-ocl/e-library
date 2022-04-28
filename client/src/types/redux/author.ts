import {
  searchAuthorFail,
  searchAuthorSuccess,
} from '../../redux/author/action'
import { Author } from '../schema'

export const AUTHORS_LIST = 'AUTHORS_LIST'
export const SEARCH_AUTHOR_FAILED = 'SEARCH_AUTHOR_FAILED'

export type AuthorSuccessType = {
  type: typeof AUTHORS_LIST
  payload: Author[]
}

export type AuthorFailType = {
  type: typeof SEARCH_AUTHOR_FAILED
  payload: Error
}

export type SearchAuthorActions =
  | ReturnType<typeof searchAuthorSuccess>
  | ReturnType<typeof searchAuthorFail>
