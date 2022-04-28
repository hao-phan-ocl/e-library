import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { openDialog } from '../../redux/dialog/actions'

type DeleteType = {
  text: string
}

export default function DeleteBtn({ text }: DeleteType) {
  const dispatch = useDispatch()

  function handleDialog() {
    dispatch(openDialog(true))
  }

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlineIcon />}
        onClick={handleDialog}
      >
        {text}
      </Button>
    </>
  )
}
