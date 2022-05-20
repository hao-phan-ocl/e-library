import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBooks } from '../redux/fetchBooks/actions'
import { RootState } from '../redux/rootReducer'
import LoadingPage from './LoadingPage'
import Intro from '../components/Intro'
import MyGrid from '../components/MyGrid'

export default function Home() {
  const dispatch = useDispatch()
  const { books, loading } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Intro />
          <MyGrid books={books} />
        </>
      )}
    </>
  )
}
