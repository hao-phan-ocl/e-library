import { useEffect } from 'react'
import { Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import SaveBtn from '../../Button/SaveBtn'
import instance from '../../../axios/instance'
import { request } from '../../../axios/requests'
import { RootState } from '../../../redux/rootReducer'

type FormData = {
  firstName: string
  lastName: string
  email: string
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

export default function ProfileForm() {
  const user = useSelector((state: RootState) => state.auth.user)

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const res = await instance.put(request('users', 'update'), data)
    if (res.status === 200) alert('User updated')
  }

  useEffect(() => {
    if (user) reset(user) // reset form defaulValues when refreshing page
  }, [reset, user])

  return (
    <>
      <Typography fontWeight={'800'} mb={2}>
        Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} mb={3} maxWidth="60%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              First name
            </Typography>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
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
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Last name
            </Typography>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
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
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Stack>
        </Stack>
        <SaveBtn />
      </form>
    </>
  )
}
