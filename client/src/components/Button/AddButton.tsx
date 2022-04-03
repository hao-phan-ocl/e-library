import { IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useDispatch, useSelector } from 'react-redux'

import { Book } from '../../types'
import { addFavorite, removeFavorite } from '../../redux/auth/actions'
import { RootState } from '../../redux/rootReducer'
import { openModal } from '../../redux/modal/actions'
import LoginModal from '../LoginModal/LoginModal'
import { useEffect } from 'react'

type AddButtonProps = {
  book?: Book
}

export default function AddButton({ book }: AddButtonProps) {
  const dispatch = useDispatch()

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  )

  const added = user?.bookLists.find((elem) => elem === book?._id)

  function handleOnClick() {
    if (book && user) {
      if (added) {
        dispatch(removeFavorite(user._id, book._id))
      } else dispatch(addFavorite(user?._id, book._id))
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
