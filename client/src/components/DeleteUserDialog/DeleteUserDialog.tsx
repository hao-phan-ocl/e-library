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

export default function DeleteUserDialog() {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.dialog.state)
  const userId = useSelector((state: RootState) => state.auth.user?._id)

  function handleClose() {
    dispatch(openDialog(false))
  }

  function handleDelete() {
    if (userId) {
      dispatch(deleteUser(userId))
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
          You account will be removed permanently and you will no longer have
          access to your booklists
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '0 20px 20px 20px' }}>
        <Stack direction="row" gap={2}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" autoFocus onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
