import { Box, Dialog } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../redux/rootReducer'
import { openDialog } from '../../redux/dialog/actions'
import LoginTable from '../LoginTable/LoginTable'

export default function LoginDialog() {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.dialog.state)

  function handleClose() {
    dispatch(openDialog(false))
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box onClick={handleClose}>
        <LoginTable />
      </Box>
    </Dialog>
  )
}