import {
  IconButton,
  ListItemIcon,
  MenuItem,
  Menu,
  Stack,
  Typography,
  Avatar,
} from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import IosShareIcon from '@mui/icons-material/IosShare'
import LogoutIcon from '@mui/icons-material/Logout'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { logout } from '../../redux/auth/actions'
import { deepOrange } from '@mui/material/colors'

type ProfileProps = {
  firstName?: string
}

export default function ProfileMenu({ firstName }: ProfileProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

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
        <Avatar sx={{ width: 30, height: 30, bgcolor: deepOrange[500] }}>
          {firstName?.slice(0, 1)}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="h6">Profile</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/admin">
          <ListItemIcon>
            <AdminPanelSettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="h6">Admin Panel</Typography>
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
