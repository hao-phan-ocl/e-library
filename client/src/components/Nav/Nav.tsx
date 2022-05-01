import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Badge, IconButton, Stack, Typography } from '@mui/material'

import { RootState } from '../../redux/rootReducer'
import ProfileMenu from './ProfileMenu'

export default function Nav() {
  const navigate = useNavigate()
  const favBooks = useSelector((state: RootState) => state.auth.user?.bookLists)
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )

  return (
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
          <>
            <IconButton component={Link} to="/favorites" title="Notification">
              <Badge badgeContent={favBooks?.length} color="info">
                <NotificationsIcon
                  color="secondary"
                  sx={{ fontSize: '120%' }}
                />
              </Badge>
            </IconButton>
            <ProfileMenu firstName={user?.firstName} />
          </>
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
  )
}
