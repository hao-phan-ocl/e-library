import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useDispatch, useSelector } from 'react-redux'

import { openDialog } from '../../redux/dialog/actions'
import { RootState } from '../../redux/rootReducer'
import { deleteUser } from '../../redux/auth/actions'

export default function DeleteBookDialog() {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.dialog.state)
  const userId = useSelector((state: RootState) => state.auth.user?._id)

  function handleClose() {
    dispatch(openDialog(false))
  }

  function handleDelete() {
    if (userId) {
      //   dispatch(deleteUser(userId))
      console.log('book deleted')
      dispatch(openDialog(false))
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: '700' }}>
        <Stack direction="row" gap={1}>
          <ErrorOutlineIcon color="warning" />
          Are you sure?
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This book will be removed permanently from the library data as well as
          users' booklists.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '0 20px 20px 20px' }}>
        <Stack direction="row" gap={2}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
