import { IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useDispatch, useSelector } from 'react-redux'

import { Book } from '../../types/schema'
import { addFavorite, removeFavorite } from '../../redux/auth/actions'
import { RootState } from '../../redux/rootReducer'
import { openDialog } from '../../redux/dialog/actions'
import LoginDialog from '../Dialog/LoginDialog'

type AddButtonProps = {
  book?: Book
}

export default function AddBtn({ book }: AddButtonProps) {
  const dispatch = useDispatch()

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  )

  const added = user?.bookLists.some((elem) => elem._id === book?._id)

  function handleOnClick() {
    if (book) {
      if (added) {
        dispatch(removeFavorite(book._id))
      } else {
        dispatch(addFavorite(book._id))
      }
    }
  }

  function handleDialog() {
    dispatch(openDialog(true))
  }

  return (
    <>
      <IconButton
        color={'primary'}
        aria-label="add-book"
        onClick={isAuthenticated ? handleOnClick : handleDialog}
        title="Favorite"
      >
        {added ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      <LoginDialog />
    </>
  )
}
