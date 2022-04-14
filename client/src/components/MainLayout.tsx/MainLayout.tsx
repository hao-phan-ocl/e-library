import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { Book } from '../../types/schema'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import AddBtn from '../Button/AddBtn'

type MainLayoutProps = {
  books: Book[]
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
}))

export default function MainLayout({ books }: MainLayoutProps) {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated)

  return (
    <Box sx={{ width: '100%', position: 'relative', margin: '20px 0' }}>
      <Stack spacing={1}>
        {books.map((book) => (
          <Item
            key={book._id}
            sx={{
              ':hover': {
                boxShadow: '0px 0px 4px 2px #49AFD0',
              },
            }}
          >
            <Box sx={{ display: 'flex', gap: '10px', padding: '0 10px' }}>
              {auth && (
                <Box position="absolute" right={5}>
                  <AddBtn book={book} />
                </Box>
              )}
              <img
                style={{ width: '120px' }}
                src={book.image}
                alt={book.title}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Stack alignItems="flex-start">
                  <Typography
                    maxWidth="90%"
                    component={Link}
                    to={`/book/${book._id}`}
                    gutterBottom
                    variant="h5"
                    fontSize={22}
                    sx={{
                      textDecoration: 'underline',
                      ':hover': {
                        color: 'rgb(233, 30, 99)',
                      },
                    }}
                  >
                    {book.title}
                  </Typography>

                  {book.authors.map((author, i) => (
                    <Typography
                      component={Link}
                      to={`/author/${author._id}`}
                      key={i}
                      color="primary"
                      sx={{
                        fontStyle: 'italic',
                        ':hover': {
                          color: 'rgb(233, 30, 99)',
                        },
                      }}
                    >
                      {author.name}
                    </Typography>
                  ))}
                </Stack>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '3rem',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography>Language: {book.language}</Typography>
                  <Typography>Year: {book.publicationYear}</Typography>
                </Box>
              </Box>
            </Box>
          </Item>
        ))}
      </Stack>
    </Box>
  )
}
