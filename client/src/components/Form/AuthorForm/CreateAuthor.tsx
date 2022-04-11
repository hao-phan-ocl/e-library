import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import instance from '../../../axios/instance'
import { request } from '../../../axios/requests'
import { Author } from '../../../types'

type AuthorFormType = {
  name: string
}

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
  })
  .required()

export default function CreateAuthor() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormType>({
    mode: 'onBlur',
    defaultValues: { name: '' },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: AuthorFormType) {
    try {
      const res = await instance.post<Author>(request('authors', 'create'), {
        name: data.name,
      })
      alert(`Author ${res.data.name} has been created`)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="column"
        maxWidth="50%"
        gap={1}
        mt={2}
        alignItems="flex-start"
      >
        <Typography>Name: </Typography>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              size="small"
            />
          )}
        />
        <Button size="small" type="submit" variant="outlined">
          Create
        </Button>
      </Stack>
    </form>
  )
}
