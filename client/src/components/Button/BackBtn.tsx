import { Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

type BackButtonProps = {
  text: string
}

export default function BackBtn({ text }: BackButtonProps) {
  return (
    <Stack alignItems="center" direction="row" spacing={2} mb={3}>
      <Link to="/">
        <ArrowBackIcon
          sx={{ ':hover': { color: '#49AFD0' }, cursor: 'pointer' }}
        />
      </Link>
      <Typography fontSize={20}>{text}</Typography>
    </Stack>
  )
}
