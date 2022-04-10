import { Divider, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { request } from '../../../axios/requests'
import { Book } from '../../../types'
import instance from '../../../axios/instance'
import SaveBtn from '../../Button/SaveBtn'
import AuthorSubForm from './SubForm/AuthorSubForm'
import CategoryFieldArray from './CategoryFieldArray'
import SingleField from './SingleField'

export type FormData = {
  title: string
  // authors: { author: string }[] //
  categories: { category: string }[] // react-hook-form only accepts objects but api call was string[]
  description: string
  language: string
  year: number
}

export type BookProps = {
  book: Book
}

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    categories: yup
      .array()
      .of(
        yup.object({ category: yup.string().required('Category is required') })
      ),
    // authors: yup
    //   .array()
    //   .of(yup.object({ author: yup.string().required('Author is required') })),
    language: yup.string().required('Language is required'),
    year: yup.number().positive().integer().required(),
  })
  .required()

export default function BookForm({ book }: BookProps) {
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      title: book.title ?? '',
      description: book.description ?? '',
      categories:
        book.categories.map((elem) => {
          return { category: elem }
        }) ?? '',
      // authors:
      //   book.authors.map((elem) => {
      //     return { author: elem.name }
      //   }) ?? '',
      language: book.language ?? '',
      year: book.publicationYear ?? '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const { categories, title, description, language, year } = data

    let categoriesArr: string[] = []
    if (categories.length) {
      categories.map((elem) => categoriesArr.push(Object.values(elem)[0]))
    }

    // Transfer categories as an object back to string[] to pass in api request
    const update = {
      title: title,
      description: description,
      categories: categoriesArr,
      language: language,
      year: year,
    }

    const res = await instance.put(request('books', 'update', book._id), update)
    if (res.status === 200) alert('Book updated')
  }

  return (
    <Stack spacing={3} maxWidth="100%" divider={<Divider />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb={3} maxWidth="80%">
          <SingleField
            control={control}
            errors={errors.title}
            title="Title"
            name="title"
          />
          <SingleField
            control={control}
            errors={errors.description}
            title="Description"
            name="description"
          />

          <SingleField
            control={control}
            errors={errors.language}
            title="Language"
            name="language"
          />

          <SingleField
            control={control}
            errors={errors.year}
            title="Year"
            name="year"
          />

          <CategoryFieldArray control={control} errors={errors.categories} />

          {/* <AuthorSubForm
          control={control}
          errors={errors.authors}
          watch={watch}
        /> */}
        </Stack>
        <SaveBtn />
      </form>
      <Stack spacing={3} mb={3} maxWidth="80%">
        <AuthorSubForm book={book} />
      </Stack>
    </Stack>
  )
}
