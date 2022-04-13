import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import BackBtn from '../components/Button/BackBtn'
import { useEffect, useState } from 'react'
import instance from '../axios/instance'
import { request } from '../axios/requests'
import { User } from '../types/schema'

export default function Admin() {
  const [allUsers, setAllUsers] = useState<User[]>([])

  useEffect(() => {
    async function getAllUsers() {
      const res = await instance.get(request('users', 'all'))
      setAllUsers(res.data)
    }

    getAllUsers()
  }, [])

  return (
    <>
      <BackBtn text="User List" />
      <Stack gap={2}>
        {allUsers.map((user) => (
          <Accordion
            key={user._id}
            sx={{
              ':hover': {
                boxShadow: '0px 0px 4px 2px #49AFD0',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="primary">
                {user.firstName + ' ' + user.lastName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={1}>
                <Stack direction="row" width="100%" gap={4}>
                  <Typography fontWeight="700" textAlign="right" width="20%">
                    First name:
                  </Typography>
                  <Typography>{user.firstName}</Typography>
                </Stack>

                <Stack direction="row" width="100%" gap={4}>
                  <Typography fontWeight="700" textAlign="right" width="20%">
                    Last name:
                  </Typography>
                  <Typography>{user.lastName}</Typography>
                </Stack>

                <Stack direction="row" width="100%" gap={4}>
                  <Typography fontWeight="700" textAlign="right" width="20%">
                    Email:
                  </Typography>
                  <Typography>{user.email}</Typography>
                </Stack>

                <Stack direction="row" width="100%" gap={4}>
                  <Typography fontWeight="700" textAlign="right" width="20%">
                    Created at:
                  </Typography>
                  <Typography>{user.createdAt}</Typography>
                </Stack>

                <Stack direction="row" width="100%" gap={4}>
                  <Typography fontWeight="700" textAlign="right" width="20%">
                    Booklists:
                  </Typography>
                  <Stack direction="column" gap={1}>
                    {user.bookLists.length ? (
                      user.bookLists.map((book) => (
                        <Typography key={book._id}>{book.title}</Typography>
                      ))
                    ) : (
                      <Typography fontStyle="italic">
                        This user has no book
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </>
  )
}
