import { Dialog } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'

import { openDialog } from '../../redux/dialog/actions'
import { RootState } from '../../redux/rootReducer'

export default function CreateAuthorDialog() {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.dialog.state)
  const { authors } = useSelector((state: RootState) => state.authors)

  function handleClose() {
    dispatch(openDialog(false))
  }
  console.log(authors)

  // useEffect(() => {
  //   if (open) dispatch(searchAuthors(authorName))
  // }, [authorName, dispatch, open])

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box onClick={handleClose}>
        {authors.map((author) => (
          <p key={author._id}>{author.name}</p>
        ))}
      </Box>
    </Dialog>
  )
}
