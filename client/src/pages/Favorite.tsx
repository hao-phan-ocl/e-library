import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import BackBtn from '../components/Button/BackBtn'
import MainLayout from '../components/MainLayout'
import { RootState } from '../redux/rootReducer'

export default function Favorite() {
  const favBooks = useSelector((state: RootState) => state.auth.user?.bookLists)

  return (
    <>
      <BackBtn text={'My Favorites'} />
      {favBooks?.length ? (
        <MainLayout books={favBooks} />
      ) : (
        <Typography variant="h6" fontSize="1.3rem">
          Your favorite list is empty
        </Typography>
      )}
    </>
  )
}
