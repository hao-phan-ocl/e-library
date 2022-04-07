import { Stack, TextField, Typography } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { Book } from '../../types'
import SaveBtn from '../Button/SaveBtn'

type FormData = {
  title: string
  authors: string[]
  description: string
  categories: [{ category: string }]
  language: string
  year: number
  //   image: string
}

type BookProps = {
  book: Book
}

export default function BookForm({ book }: BookProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      title: book.title ?? '',
      description: book.description ?? '',
      categories: [{ category: 'category' }] ?? '',
      language: book.language ?? '',
      year: book.publicationYear ?? '',
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'categories',
  })

  async function onSubmit(data: FormData) {
    const res = await instance.put(request('books', 'update', book._id), data)
    if (res.status === 200) alert('Book updated')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} mb={3} maxWidth="80%">
        <Stack
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          spacing={2}
          direction={{ sm: 'row', xs: 'column' }}
        >
          <Typography textAlign={{ sm: 'right', xs: 'left' }} width="40%">
            Title
          </Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                fullWidth
                size="small"
              />
            )}
          />
        </Stack>
        <Stack
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          spacing={2}
          direction={{ sm: 'row', xs: 'column' }}
        >
          <Typography textAlign={{ sm: 'right', xs: 'left' }} width="40%">
            Description
          </Typography>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                multiline
                maxRows={5}
                fullWidth
                size="small"
              />
            )}
          />
        </Stack>
        <Stack
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          spacing={2}
          direction={{ sm: 'row', xs: 'column' }}
        >
          <Typography textAlign={{ sm: 'right', xs: 'left' }} width="40%">
            Categories
          </Typography>
          {fields.map((item, index) => (
            <li key={item.id}>
              {/* <input {...register(`categories.${index}.category`)} /> */}
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.categories)}
                    // helperText={errors.categories?.message}
                    multiline
                    maxRows={2}
                    fullWidth
                    size="small"
                  />
                )}
              />
            </li>
          ))}
          {/* <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.categories)}
                // helperText={errors.categories?.message}
                multiline
                maxRows={2}
                fullWidth
                size="small"
              />
            )}
          /> */}
        </Stack>
        <Stack
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          spacing={2}
          direction={{ sm: 'row', xs: 'column' }}
        >
          <Typography textAlign={{ sm: 'right', xs: 'left' }} width="40%">
            Language
          </Typography>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.language)}
                helperText={errors.language?.message}
                fullWidth
                size="small"
              />
            )}
          />
        </Stack>
        <Stack
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          spacing={2}
          direction={{ sm: 'row', xs: 'column' }}
        >
          <Typography textAlign={{ sm: 'right', xs: 'left' }} width="40%">
            Year
          </Typography>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.year)}
                helperText={errors.year?.message}
                fullWidth
                size="small"
              />
            )}
          />
        </Stack>
      </Stack>
      <SaveBtn />
    </form>
  )
}
