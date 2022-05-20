import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LoginTable from '../components/LoginTable'
import login from '../images/login.jpg'
import { RootState } from '../redux/rootReducer'

export default function Login() {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth) navigate('/')
  }, [auth, navigate])

  return (
    <Box
      sx={{
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoginTable />
    </Box>
  )
}
