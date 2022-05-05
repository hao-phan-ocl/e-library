import { Typography, Link, Stack } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'

export default function Footer() {
  return (
    <Stack alignItems="center" gap="7px" p="50px 0" mt="auto">
      <Stack flexDirection="row" alignItems="center" gap="5px">
        <Typography fontSize="20px">Developed by</Typography>
        <Typography fontSize="20px" fontWeight={600}>
          Hao Phan
        </Typography>
      </Stack>
      <Stack flexDirection="row" gap="5px">
        <Link
          href="https://www.linkedin.com/in/hao-phan-06b628110/"
          target="_blank"
          rel="noreferrer"
          aria-label="Linkedin"
        >
          <LinkedIn
            sx={{ fontSize: '35px', ':hover': { color: 'rgb(233, 30, 99)' } }}
          />
        </Link>
        <Link
          href="https://github.com/nguyenhaophan/e-library"
          target="_blank"
          rel="noreferrer"
          aria-label="Github"
        >
          <GitHub
            sx={{ fontSize: '35px', ':hover': { color: 'rgb(233, 30, 99)' } }}
          />
        </Link>
      </Stack>
    </Stack>
  )
}
