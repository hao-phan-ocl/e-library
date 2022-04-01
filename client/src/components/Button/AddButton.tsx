import { IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useDispatch, useSelector } from 'react-redux'

import { Book } from '../../types'
import { addFavorite, removeFavorite } from '../../redux/favorite/actions'
import { RootState } from '../../redux/rootReducer'
import { openModal } from '../../redux/modal/actions'
import LoginModal from '../LoginModal/LoginModal'

type AddButtonProps = {
  book?: Book
}

export default function AddButton({ book }: AddButtonProps) {
  const dispatch = useDispatch()
  const favBooks = useSelector((state: RootState) => state.favBooks.favBooks)
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const added = favBooks.find((elem) => elem._id === book?._id)

  function handleOnClick() {
    if (book) {
      if (added) dispatch(removeFavorite(book))
      else dispatch(addFavorite(book))
    }
  }

  function handleModal() {
    dispatch(openModal(true))
  }

  return (
    <>
      <IconButton
        color={'primary'}
        aria-label="add-book"
        onClick={isAuthenticated ? handleOnClick : handleModal}
      >
        {added ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      <LoginModal />
    </>
  )
}
