import { Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

type BackButtonProps = {
  text: string
}

export default function BackBtn({ text }: BackButtonProps) {
  const navigate = useNavigate()

  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      <ArrowBackIcon
        sx={{ ':hover': { color: '#49AFD0' }, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />
      <Typography fontSize={20}>{text}</Typography>
    </Stack>
  )
}
