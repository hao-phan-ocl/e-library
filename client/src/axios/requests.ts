type RouteTypes = 'users' | 'books' | 'authors'

type UrlType =
  | 'all'
  | 'id'
  | 'add-books'
  | 'delete-books'
  | 'title'
  | 'name'
  | 'google-login'
  | 'register'

type IdType = string

export function request(route: RouteTypes, type: UrlType, id: IdType = '') {
  return `${route}/${type}/${id}`
}
