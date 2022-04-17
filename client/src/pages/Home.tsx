import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBooks } from '../redux/fetchBooks/actions'
import { RootState } from '../redux/rootReducer'
import MainLayout from '../components/MainLayout.tsx/MainLayout'
import Loading from '../pages/Loading'

export default function Home() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.books.books)
  const isLoaded = useSelector((state: RootState) => state.books.loading)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return <>{isLoaded ? <Loading /> : <MainLayout books={books} />}</>
}
