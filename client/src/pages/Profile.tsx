import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Container,
  Paper,
  Stack,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

import Nav from '../components/Nav/Nav'
import { logout } from '../redux/auth/actions'
import BackButton from '../components/Button/BackButton'
import { RootState } from '../redux/rootReducer'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  // Remember to change <Typography> as <div> component to render other typography inside

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  function handleLogout() {
    dispatch(logout())
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <BackButton text={'My Profile'} />
        <Paper>
          <Box sx={{ width: '100%' }} mt={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="profile tabs"
              >
                <Tab label="Profile Info" {...a11yProps(0)} />
                <Tab label="Remove Profile" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Stack>
                <Typography variant="h5">Profile</Typography>
                <Typography variant="h6">{user?.firstName}</Typography>
                <Typography variant="h6">{user?.lastName}</Typography>
                <Typography variant="h6">{user?.email}</Typography>
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Stack spacing={2} justifyContent="flex-start">
                <Typography>Log out</Typography>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  sx={{ maxWidth: '150px' }}
                  onClick={handleLogout}
                >
                  Log me out
                </Button>
              </Stack>
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </>
  )
}
