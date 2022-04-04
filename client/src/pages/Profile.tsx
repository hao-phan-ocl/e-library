import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Paper,
  Stack,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@mui/material'

import Nav from '../components/Nav/Nav'
import BackButton from '../components/Button/BackButton'
import { RootState } from '../redux/rootReducer'
import DeleteUserButton from '../components/Button/DeleteUserButton'
import LogoutButton from '../components/Button/LogoutButton'

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
  const user = useSelector((state: RootState) => state.auth.user)

  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
              <Stack spacing={4} alignItems="flex-start">
                <Stack spacing={1}>
                  <Typography fontWeight={'800'}>Log out</Typography>
                  <LogoutButton />
                </Stack>
                <Stack spacing={1}>
                  <Typography fontWeight={'800'}>Remove account</Typography>
                  <DeleteUserButton />
                </Stack>
              </Stack>
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </>
  )
}
