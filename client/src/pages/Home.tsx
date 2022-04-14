import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBooks } from '../redux/fetchBooks/actions'
import { RootState } from '../redux/rootReducer'
import MainLayout from '../components/MainLayout.tsx/MainLayout'

export default function Home() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.books.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return <MainLayout books={books} />
}
