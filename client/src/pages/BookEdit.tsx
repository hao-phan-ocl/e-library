import { Box, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BackBtn from '../components/Button/BackBtn'
import DeleteBtn from '../components/Button/DeleteBtn'
import DeleteBookDialog from '../components/Dialog/DeleteBookDialog'
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

export default function BookEdit() {
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { book } = useSelector((state: RootState) => state.book)

  return (
    <>
      <BackBtn text={'Edit Book'} />
      <Paper>
        <Box sx={{ width: '100%' }} mt={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="book-edit tabs"
            >
              <Tab label="Edit Book" {...a11yProps(0)} />
              <Tab label="Remove Book" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {book?.title}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Stack spacing={4} alignItems="flex-start">
              <Stack spacing={1}>
                <Typography fontWeight={'800'}>Remove book</Typography>
                <DeleteBtn text={'remove this book'} />
                <DeleteBookDialog />
              </Stack>
            </Stack>
          </TabPanel>
        </Box>
      </Paper>
    </>
  )
}
