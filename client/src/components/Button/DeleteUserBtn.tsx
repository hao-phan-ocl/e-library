import { Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch } from 'react-redux'

import DeleteUserDialog from '../Dialog/DeleteUserDialog'
import { openDialog } from '../../redux/dialog/actions'

export default function DeleteUserBtn() {
  const dispatch = useDispatch()

  function handleDialog() {
    dispatch(openDialog(true))
  }

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlineIcon />}
        onClick={handleDialog}
      >
        Remove my account
      </Button>
      <DeleteUserDialog />
    </>
  )
}
