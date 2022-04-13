import { Dispatch } from 'redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import {
  AuthorFailType,
  AuthorSuccessType,
  AUTHORS_LIST,
  SEARCH_AUTHOR_FAILED,
} from '../../types/redux/author'
import { Author } from '../../types/schema'

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

export function searchAuthorSuccess(authors: Author[]): AuthorSuccessType {
  return {
    type: AUTHORS_LIST,
    payload: authors,
  }
}

export function searchAuthorFail(error: Error): AuthorFailType {
  return {
    type: SEARCH_AUTHOR_FAILED,
    payload: error,
  }
}
