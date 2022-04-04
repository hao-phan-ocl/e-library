import {
  Badge,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useNavigate } from 'react-router-dom'
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
        mb={5}
      >
        <Button
          title="Home"
          sx={{ display: 'flex' }}
          onClick={() => navigate('/')}
        >
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
        </Button>
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
          {/* <IconButton
            color="secondary"
            title="Booklists"
            onClick={() => navigate('/favorites')}
          >
            <Badge badgeContent={favBooks.length} color="error">
              <BookmarkIcon fontSize="medium" />
            </Badge>
          </IconButton> */}
        </Stack>
      </Stack>
    </Container>
  )
}
