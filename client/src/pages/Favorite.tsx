import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import instance from '../axios/instance'
import { request } from '../axios/requests'
import BackButton from '../components/Button/BackButton'

import MainLayout from '../components/MainLayout.tsx/MainLayout'
import Nav from '../components/Nav/Nav'
import { RootState } from '../redux/rootReducer'

export default function Favorite() {
  // const favBooks = useSelector((state: RootState) => state.favBooks.favBooks)
  const user = useSelector((state: RootState) => state.auth.user)
  const books = useSelector((state: RootState) => state.books.books)
  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <BackButton text={'My Favorites'} />
        <MainLayout books={books} />
      </Container>
    </>
  )
}
