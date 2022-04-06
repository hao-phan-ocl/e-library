import { Container, Stack, Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/rootReducer'
import ProfileMenu from './ProfileMenu'

export default function Nav() {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return (
    <Container maxWidth="md">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={10}
      >
        <Link to="/" title="Home">
          <Stack direction="row" padding="10px 0">
            <Typography
              color="primary"
              variant="h1"
              sx={{
                fontSize: '2.5rem',
                textTransform: 'lowercase',
              }}
            >
              e
            </Typography>
            <Typography
              color="secondary"
              variant="h1"
              sx={{
                fontSize: '2.5rem',
                textTransform: 'capitalize',
              }}
            >
              Library
            </Typography>
          </Stack>
        </Link>
        <Stack alignItems="center" spacing={1} direction="row">
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Typography
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                ':hover': { textDecoration: 'none' },
              }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Typography>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
