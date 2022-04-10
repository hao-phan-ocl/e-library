import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { Author } from '../../types'

export const AUTHORS_LIST = 'AUTHORS_LIST'
export const SEARCH_AUTHOR_FAILED = 'SEARCH_AUTHOR_FAILED'

export function searchAuthors(authorName: string) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await instance.get(request('authors', 'name', authorName))
      dispatch(searchAuthorSuccess(res.data))
    } catch (error) {
      dispatch(searchAuthorFail(error as Error))
    }
  }
}

function searchAuthorSuccess(authors: Author[]): AuthorSuccessType {
  return {
    type: AUTHORS_LIST,
    payload: authors,
  }
}

function searchAuthorFail(error: Error): AuthorFailType {
  return {
    type: SEARCH_AUTHOR_FAILED,
    payload: error,
  }
}

type AuthorSuccessType = {
  type: typeof AUTHORS_LIST
  payload: Author[]
}

type AuthorFailType = {
  type: typeof SEARCH_AUTHOR_FAILED
  payload: Error
}

export type SearchAuthorActions =
  | ReturnType<typeof searchAuthorSuccess>
  | ReturnType<typeof searchAuthorFail>
