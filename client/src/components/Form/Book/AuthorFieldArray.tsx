import {
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  Control,
  Controller,
  FieldError,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { FormData } from './UpdateBookForm'
import { openDialog } from '../../../redux/dialog/actions'
import { searchAuthorByName } from '../../../redux/author/action'
import CheckAuthorDialog from '../../Dialog/CheckAuthorDialog'

type AuthorForm = {
  control: Control<FormData>
  errors?: { author?: FieldError }[]
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
}

export default function AuthorFieldArray({
  control,
  errors,
  watch,
  setValue,
}: AuthorForm) {
  const dispatch = useDispatch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'authors',
  })

  return (
    <Stack
      alignItems={{ sm: 'center', xs: 'flex-start' }}
      spacing={2}
      direction={{ sm: 'row', xs: 'column' }}
    >
      <Typography
        fontWeight="700"
        textAlign={{ sm: 'right', xs: 'left' }}
        width="40%"
      >
        Authors
      </Typography>
      <Stack width="100%" alignItems="flex-start">
        <List sx={{ padding: '0', width: '100%' }}>
          {fields.map((item, index) => (
            <ListItem key={item.id} sx={{ padding: '3px 0' }}>
              <Controller
                name={`authors.${index}.author` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors?.[index]?.author)}
                    helperText={errors?.[index]?.author?.message}
                    fullWidth
                    size="small"
                  />
                )}
              />
              <Button
                sx={{ marginLeft: '7px' }}
                size="small"
                color="success"
                variant="outlined"
                onClick={() => {
                  dispatch(openDialog(true))
                  dispatch(searchAuthorByName(watch(`authors.${index}.author`)))
                }}
              >
                Check
              </Button>
              <IconButton
                size="small"
                color="error"
                onClick={() => remove(index)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
              <CheckAuthorDialog index={index} setValue={setValue} />
            </ListItem>
          ))}
        </List>
        <Stack direction="row" gap={2}>
          <Button
            color="error"
            size="small"
            variant="outlined"
            onClick={() => append({ author: '' })} // This should never be empty, must have default value
          >
            More
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
