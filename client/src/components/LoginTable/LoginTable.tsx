import { Box, Stack, Typography } from '@mui/material'
import GoogleLoginButton from '../Button/GoogleLoginButton'

export default function LoginTable() {
  return (
    <Stack
      justifyContent="center"
      direction="column"
      alignItems="center"
      gap={5}
      width={350}
      height={400}
      borderRadius={3}
      sx={{
        opacity: '.92',
        backgroundColor: 'white',
      }}
    >
      <Stack direction="row">
        <Typography variant="h1" sx={{ color: '#49AFD0', fontSize: '4rem' }}>
          e
        </Typography>
        <Typography variant="h1" sx={{ color: 'gray', fontSize: '4rem' }}>
          Library
        </Typography>
      </Stack>
      <GoogleLoginButton />
    </Stack>
  )
}
