import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBooks } from '../redux/fetchBooks/actions'
import { RootState } from '../redux/rootReducer'
import MainLayout from '../components/MainLayout.tsx/MainLayout'
import Loading from '../pages/Loading'

export default function Home() {
  const dispatch = useDispatch()
  const { books, loading } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return <>{loading ? <Loading /> : <MainLayout books={books} />}</>
}
