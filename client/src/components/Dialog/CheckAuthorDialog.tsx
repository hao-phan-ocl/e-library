import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import { UseFormSetValue } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { openDialog } from '../../redux/dialog/actions'
import { RootState } from '../../redux/rootReducer'
import CreateAuthor from '../Form/AuthorForm/CreateAuthor'
import { FormData } from '../Form/BookForm/BookForm'
// import { AuthorForm } from '../Form/BookForm/SubForm/AuthorSubForm'

type CheckAuthorProps = {
  index: number
  // setValue: UseFormSetValue<AuthorForm>
  setValue: UseFormSetValue<FormData>
}

export default function CheckAuthorDialog({
  index,
  setValue,
}: CheckAuthorProps) {
  const [createAuthor, setCreateAuthor] = useState(false)
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.dialog.state)
  const { authors } = useSelector((state: RootState) => state.authors)

  function handleClose() {
    dispatch(openDialog(false))
    setCreateAuthor(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ fontWeight: '700' }}>Did you mean:</DialogTitle>

      <DialogContent>
        {authors.map((author) => (
          <Button
            key={author._id}
            onClick={() => {
              setValue(`authors.${index}.author`, author.name)
              handleClose()
            }}
          >
            {author.name}
          </Button>
        ))}
        <Stack direction="row" gap={1} mt={1}>
          <Typography>The author you are looking for is not here?</Typography>
          <Typography
            color="primary"
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setCreateAuthor(true)}
          >
            Create a new author.
          </Typography>
        </Stack>
        {createAuthor && <CreateAuthor />}
      </DialogContent>
      <DialogActions sx={{ padding: '0 20px 20px 20px' }}>
        <Stack direction="row" gap={2}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
