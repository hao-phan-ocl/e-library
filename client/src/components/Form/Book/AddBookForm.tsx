import { Divider, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import SaveBtn from '../../Button/SaveBtn'
import AuthorFieldArray from './AuthorFieldArray'
import CategoryFieldArray from './CategoryFieldArray'
import SingleField from './SingleField'
import { FormData } from './UpdateBookForm'
import { Author } from '../../../types/schema'
import instance from '../../../axios/instance'
import { request } from '../../../axios/requests'

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    categories: yup
      .array()
      .of(
        yup.object({ category: yup.string().required('Category is required') })
      ),
    authors: yup
      .array()
      .of(yup.object({ author: yup.string().required('Author is required') })),
    language: yup.string().required('Language is required'),
    image: yup.string().required('Must be a string of url'),
    year: yup.number().positive().integer().required('Year is required'),
  })
  .required()

export default function AddBookForm() {
  const {
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      categories: [{ category: '' }],
      authors: [{ author: '' }],
      language: '',
      year: undefined,
      image:
        'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const { categories, title, description, authors, language, image, year } =
      data

    // Transfer categories as an object back to string[] for api call
    let categoriesArr: string[] = []
    if (categories.length) {
      categories.forEach((elem) => categoriesArr.push(Object.values(elem)[0]))
    }

    // Transfer authors as an object back to string[] for api call
    // Until now authors is still an array of authorNames while api requires author IDs
    let authorNameArr: string[] = []
    if (authors.length) {
      authors.forEach((elem) => authorNameArr.push(Object.values(elem)[0]))
    }

    // Call api to find authorId by name
    async function getAuthorId() {
      let arrayOfIds: string[] = []

      await Promise.all(
        authorNameArr.map(async (elem) => {
          const res = await instance.get(request('authors', 'name', elem))

          const authors: Author[] = res.data
          authors.forEach((elem) => arrayOfIds.push(elem._id))
        })
      )

      return arrayOfIds
    }

    // Here, categories and authors both are string[] and ready for api call
    // categoies is array of text
    // authors is array of IDs. Both are due to backend logic
    async function addBook() {
      const authorIdArr = await getAuthorId()

      const add = {
        title: title,
        description: description,
        categories: categoriesArr,
        authors: authorIdArr,
        language: language,
        image: image,
        publicationYear: year,
      }

      const res = await instance.post(request('books', 'create'), add)
      if (res.status === 201) {
        alert('Book added')
        window.location.reload() // reload page after update
      }
    }
    addBook()
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
          <SingleField
            control={control}
            errors={errors.image}
            title="Image"
            name="image"
          />
          <CategoryFieldArray control={control} errors={errors.categories} />
          <AuthorFieldArray
            control={control}
            errors={errors.authors}
            watch={watch}
            setValue={setValue}
          />
        </Stack>
        <SaveBtn />
      </form>
    </Stack>
  )
}
