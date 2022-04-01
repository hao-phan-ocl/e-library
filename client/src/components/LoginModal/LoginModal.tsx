import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../redux/rootReducer'
import { openModal } from '../../redux/modal/actions'
import LoginTable from '../LoginTable/LoginTable'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '7px',
}

export default function LoginModal() {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.modal.state)
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (auth) {
    handleClose()
  }

  function handleClose() {
    dispatch(openModal(false))
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack justifyContent="center" alignItems="center">
            <LoginTable />
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
