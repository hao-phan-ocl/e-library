import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import BackButton from '../components/Button/BackButton'

import MainLayout from '../components/MainLayout.tsx/MainLayout'
import Nav from '../components/Nav/Nav'
import { RootState } from '../redux/rootReducer'

export default function Favorite() {
  const favBooks = useSelector((state: RootState) => state.favBooks.favBooks)

  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <BackButton text={'My Favorites'} />
        <MainLayout books={favBooks} />
      </Container>
    </>
  )
}
