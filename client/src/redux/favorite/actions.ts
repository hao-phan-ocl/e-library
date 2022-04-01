import { Book } from '../../types'

export const ADD_FAVOURITE = 'ADD_FAVORITE'
export const REMOVE_FAVOURITE = 'REMOVE_FAVORITE'

export function addFavorite(book: Book): AddFavoriteType {
  return {
    type: ADD_FAVOURITE,
    payload: book,
  }
}

export function removeFavorite(book: Book): RemoveFavoriteType {
  return {
    type: REMOVE_FAVOURITE,
    payload: book,
  }
}

type AddFavoriteType = {
  type: typeof ADD_FAVOURITE
  payload: Book
}

type RemoveFavoriteType = {
  type: typeof REMOVE_FAVOURITE
  payload: Book
}

export type FavoriteActions =
  | ReturnType<typeof addFavorite>
  | ReturnType<typeof removeFavorite>
