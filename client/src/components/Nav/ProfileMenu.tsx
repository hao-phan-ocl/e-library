import {
  IconButton,
  ListItemIcon,
  MenuItem,
  Menu,
  Stack,
  Typography,
  Badge,
} from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import IosShareIcon from '@mui/icons-material/IosShare'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import BookMarkIcon from '@mui/icons-material/Bookmark'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { logout } from '../../redux/auth/actions'
import { RootState } from '../../redux/rootReducer'

export default function ProfileMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const favBooks = useSelector((state: RootState) => state.auth.user?.bookLists)

  useEffect(() => {
    setAnchorEl(null) // Optional: to close menu board when route changed
  }, [location])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function handleClose() {
    setAnchorEl(null)
  }

  function handleLogout() {
    dispatch(logout())
    localStorage.clear()
    navigate('/')
  }

  function handleInfoClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Stack position="relative">
      <IconButton color="secondary" title="Profile" onClick={handleInfoClick}>
        <Badge
          badgeContent={favBooks?.length}
          overlap="circular"
          variant="dot"
          color="primary"
        >
          <PersonIcon fontSize="medium" />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="h6">Profile</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/favorites">
          <ListItemIcon>
            <Badge
              badgeContent={favBooks?.length}
              variant="dot"
              overlap="circular"
              color="primary"
            >
              <BookMarkIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <Typography variant="h6">My Lists</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/book-add">
          <ListItemIcon color="primary">
            <IosShareIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="h6">Add Book</Typography>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="h6">Log out</Typography>
        </MenuItem>
      </Menu>
    </Stack>
  )
}
