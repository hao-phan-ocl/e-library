import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'

import { fetchBook } from '../redux/fetchBook/actions'
import { RootState } from '../redux/rootReducer'
import BackButton from '../components/Button/BackBtn'
import AddBtn from '../components/Button/AddBtn'

export default function BookInfo() {
  const { bookId } = useParams()
  const dispatch = useDispatch()
  const { book, loading } = useSelector((state: RootState) => state.book)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchBook(bookId as string))
  }, [dispatch, bookId])

  return (
    <>
      <BackButton text={book?.title || 'Book Detail'} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack mt={5} position="relative" direction="row" textAlign="justify">
          <Box position="absolute" right={0}>
            <AddBtn book={book} />
          </Box>
          <Stack spacing={1}>
            <img
              style={{ width: '220px' }}
              src={book?.image}
              alt={book?.title}
            />
            <Stack direction="column" spacing={0.7}>
              <Button
                color="primary"
                variant="contained"
                size="small"
                startIcon={<FileDownloadOutlinedIcon />}
              >
                Download
              </Button>
              {isAuthenticated && book && (
                <Button
                  component={Link}
                  to={`/book-edit/${book._id}`}
                  size="small"
                  color="secondary"
                  variant="contained"
                  startIcon={<ModeEditOutlinedIcon />}
                >
                  Edit
                </Button>
              )}
            </Stack>
          </Stack>
          <Stack pl={2} pr={1} alignItems="flex-start">
            <Typography
              gutterBottom
              variant="h5"
              fontSize="1.4rem"
              maxWidth="90%"
            >
              {book?.title}
            </Typography>
            {book?.authors.map((author, i) => (
              <Typography
                component={Link}
                to={`/author/${author._id}`}
                gutterBottom
                color="primary"
                variant="h6"
                key={i}
                sx={{
                  fontWeight: 550,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontStyle: 'italic',
                  ':hover': {
                    color: 'rgb(233, 30, 99)',
                  },
                }}
              >
                {author.name}
              </Typography>
            ))}

            <Typography variant="h6">{book?.description}</Typography>
            <Stack spacing={1} mt={3}>
              <Stack direction="row" spacing={0.75}>
                <Typography variant="h6">Categories: </Typography>
                <Typography variant="h6">
                  {book?.categories.map((category, i, arr) => {
                    return i !== arr.length - 1 ? category + ', ' : category
                  })}
                </Typography>
              </Stack>
              <Typography variant="h6">
                Publication year: {book?.publicationYear}
              </Typography>
              <Typography variant="h6">Language: {book?.language}</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}
