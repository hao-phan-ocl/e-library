import { Skeleton, Stack } from '@mui/material'

export default function Loading() {
  return (
    <Stack gap="10px">
      {Array.from(Array(6)).map((e, i) => (
        <Stack key={i} direction="row" gap="10px">
          <Skeleton variant="rectangular" width={120} height={160} />
          <Stack width="100%" position="relative">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="15%" />
            <Skeleton
              variant="text"
              width="30%"
              sx={{ position: 'absolute', bottom: '0', right: '0' }}
            />
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
