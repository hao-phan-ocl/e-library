import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../redux/auth/actions'

export default function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logout())
    localStorage.clear()
    navigate('/')
  }
  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
    >
      Log me out
    </Button>
  )
}
