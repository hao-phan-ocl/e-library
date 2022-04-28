import {
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Control, Controller, FieldError, useFieldArray } from 'react-hook-form'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { FormData } from './UpdateBookForm'

type FieldArrayType = {
  control: Control<FormData>
  errors?: { category?: FieldError }[]
}

export default function CategoryFieldArray({
  control,
  errors,
}: FieldArrayType) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
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
        Categories
      </Typography>
      <Stack width="100%" alignItems="flex-start">
        <List sx={{ padding: '0', width: '100%' }}>
          {fields.map((item, index) => (
            <ListItem key={item.id} sx={{ padding: '3px 0' }}>
              <Controller
                name={`categories.${index}.category` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors?.[index]?.category)}
                    helperText={errors?.[index]?.category?.message}
                    fullWidth
                    size="small"
                  />
                )}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => remove(index)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          color="error"
          size="small"
          variant="outlined"
          onClick={() => append({ category: '' })} // This should never be empty, must have default value
        >
          More
        </Button>
      </Stack>
    </Stack>
  )
}
