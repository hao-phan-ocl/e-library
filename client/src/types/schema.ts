export type User = {
  // username: string
  // password?: string
  _id: string
  firstName: string
  lastName: string
  email: string
  bookLists: Book[]
  createdAt: string
}

export type Book = {
  _id: string
  title: string
  authors: Author[]
  description: string
  categories: string[]
  language: string
  publicationYear: number
  image: string
  readers?: string[]
}

export type Author = {
  _id: string
  name: string
  books?: Book[]
}
