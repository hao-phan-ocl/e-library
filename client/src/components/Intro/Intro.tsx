import { Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { openDialog } from '../../redux/dialog/actions'
import { RootState } from '../../redux/rootReducer'
import LoginDialog from '../Dialog/LoginDialog'

export default function Intro() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated)

  function handleOnClick() {
    if (!auth) {
      dispatch(openDialog(true))
    } else {
      navigate('/profile')
    }
  }

  return (
    <>
      <Stack
        sx={{ background: '#fff8e1' }}
        spacing="10px"
        p="10px"
        border="2px solid #ffe9a4"
      >
        <Typography paragraph mb="5px">
          <Typography fontWeight="800" component="span">
            {'Welcome to '}
          </Typography>

          <Typography color="primary" fontWeight="800" component="span">
            e
          </Typography>
          <Typography component="span" fontWeight="800">
            Library!
          </Typography>
        </Typography>

        <Typography>
          Visitors are able to gain full access to our library's books.
        </Typography>
        <Typography paragraph>
          <Typography component="span">{'Please '}</Typography>
          <Typography
            component="span"
            color="primary"
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={handleOnClick}
          >
            {'sign in'}
          </Typography>
          <Typography component="span">
            {
              ' if you would like to become a user. Registered users are able to '
            }
          </Typography>
          <Typography component="span" color="primary">
            {'add favorites'}
          </Typography>
          <Typography component="span">{', '}</Typography>
          <Typography component="span" color="primary">
            {'create '}
          </Typography>
          <Typography component="span">{'or '}</Typography>
          <Typography component="span" color="primary">
            {'delete books'}
          </Typography>
          <Typography component="span">.</Typography>
        </Typography>
      </Stack>
      <LoginDialog />
    </>
  )
}
