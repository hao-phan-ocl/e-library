import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Nav from '../components/Nav/Nav'
import SearchBar from '../components/SearchBar/SearchBar'
import { fetchBooks } from '../redux/fetchBooks/actions'
import { RootState } from '../redux/rootReducer'
import MainLayout from '../components/MainLayout.tsx/MainLayout'

export default function Home() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.books.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <SearchBar />
        <MainLayout books={books} />
      </Container>
    </>
  )
}
