type RouteTypes = 'users' | 'books' | 'authors'

type UrlType =
  | 'all'
  | 'id'
  | 'add-favorite'
  | 'delete-favorite'
  | 'title'
  | 'name'
  | 'google-login'
  | 'register'
  | 'delete'
  | 'profile'
  | 'update'

type IdType = string

export function request(route: RouteTypes, type: UrlType, id: IdType = '') {
  return `${route}/${type}/${id}`
}
