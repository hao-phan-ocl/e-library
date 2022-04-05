import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { Book, Author } from '../../types'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated)

  function handleTitleClick(book: Book) {
    navigate(`/book/${book._id}`)
  }

  function handleAuthorClick(author: Author) {
    navigate(`/author/${author.name}`)
  }

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
                    gutterBottom
                    variant="h5"
                    fontSize={22}
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => handleTitleClick(book)}
                  >
                    {book.title}
                  </Typography>
                  {book.authors.map((author, i) => (
                    <Typography
                      key={i}
                      color="primary"
                      sx={{
                        fontStyle: 'italic',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleAuthorClick(author)}
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
