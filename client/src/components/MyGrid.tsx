import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'

import { Book } from '../types/schema'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

type MyGridProps = {
  books: Book[]
}

export default function MyGrid({ books }: MyGridProps) {
  return (
    <Grid
      display="grid"
      m="10px 0"
      gridTemplateColumns="repeat(auto-fill, 165px)"
      gridAutoRows="auto"
      columnGap="5px"
      rowGap="10px"
      justifyContent="center"
      justifyItems="center"
    >
      {books.map((book) => (
        <Grid
          key={book._id}
          item
          component={Link}
          to={`/book/${book._id}`}
          title={book.title}
        >
          <Item
            sx={{
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0px 0px 4px 2px #49AFD0',
                transform: 'scale(.92)',
              },
              transition: '.3s',
            }}
          >
            <img
              alt={book.title}
              style={{ width: '100%', height: '225px' }}
              src={book.image}
            />
          </Item>
        </Grid>
      ))}
    </Grid>
  )
}
