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
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import * as yup from 'yup'

import { BookProps, FormData } from '../BookForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { openDialog } from '../../../../redux/dialog/actions'
import { searchAuthors } from '../../../../redux/author/action'
import SaveBtn from '../../../Button/SaveBtn'
import CheckAuthorDialog from '../../../Dialog/CheckAuthorDialog'

type AuthorForm = {
  control: Control<FormData>
  errors?: { author?: FieldError }[]
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
}

// export type AuthorForm = {
//   authors: { author: string }[]
// }

// const schema = yup
//   .object({
//     authors: yup
//       .array()
//       .of(yup.object({ author: yup.string().required('Author is required') })),
//   })
//   .required()

// export default function AuthorSubForm({ book }: BookProps) {
export default function AuthorSubForm({
  control,
  errors,
  watch,
  setValue,
}: AuthorForm) {
  const dispatch = useDispatch()
  // const {
  //   setValue,
  //   watch,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm<AuthorForm>({
  //   mode: 'onBlur',
  //   defaultValues: {
  //     authors:
  //       book.authors.map((elem) => {
  //         return { author: elem.name }
  //       }) ?? '',
  //   },
  //   resolver: yupResolver(schema),
  // })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'authors',
  })

  // async function onSubmit(data: AuthorForm) {
  //   console.log(data)
  // }

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <Stack
      alignItems={{ sm: 'center', xs: 'flex-start' }}
      spacing={2}
      direction={{ sm: 'row', xs: 'column' }}
    >
      <Typography textAlign={{ sm: 'right', xs: 'left' }} width="40%">
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
                  dispatch(searchAuthors(watch(`authors.${index}.author`)))
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
    /* <SaveBtn />
    </form> */
  )
}

// export default function AuthorSubForm({
//   control,
//   errors,
//   watch,
// }: FieldArrayType) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'authors',
//   })

//   return (
//     <Stack
//       alignItems={{ sm: 'center', xs: 'flex-start' }}
//       spacing={2}
//       direction={{ sm: 'row', xs: 'column' }}
//     >
//       <Typography textAlign={{ sm: 'right', xs: 'left' }} width="40%">
//         Authors
//       </Typography>
//       <Stack width="100%" alignItems="flex-start">
//         <List sx={{ padding: '0', width: '100%' }}>
//           {fields.map((item, index) => (
//             <ListItem key={item.id} sx={{ padding: '3px 0' }}>
//               <Controller
//                 name={`authors.${index}.author` as const}
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     error={Boolean(errors?.[index]?.author)}
//                     helperText={errors?.[index]?.author?.message}
//                     fullWidth
//                     size="small"
//                   />
//                 )}
//               />
//               <IconButton
//                 size="small"
//                 color="error"
//                 onClick={() => remove(index)}
//               >
//                 <DeleteOutlinedIcon />
//               </IconButton>
//             </ListItem>
//           ))}
//         </List>
//         <Button
//           color="error"
//           size="small"
//           variant="outlined"
//           onClick={() => append({ author: '' })} // This should never be empty, must have default value
//         >
//           More
//         </Button>
//       </Stack>
//     </Stack>
//   )
// }