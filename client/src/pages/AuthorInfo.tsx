import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import instance from '../axios/instance'
import { request } from '../axios/requests'
import { Author, Book } from '../types/schema'
import BackBtn from '../components/Button/BackBtn'
import MainLayout from '../components/MainLayout'

export default function AuthorInfo() {
  const { authorId } = useParams()
  const [author, setAuthor] = useState<Author>()
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    async function getAuthor() {
      const res = await instance.get(request('authors', 'id', authorId))
      setAuthor(res.data)
    }

    getAuthor()

    async function getBooks() {
      const res = await instance.get(request('books', 'author-id', authorId))
      setBooks(res.data)
    }
    getBooks()
  }, [authorId])

  return (
    <>
      {author && (
        <>
          <BackBtn text={author?.name} />
          <MainLayout books={books} />
        </>
      )}
    </>
  )
}
