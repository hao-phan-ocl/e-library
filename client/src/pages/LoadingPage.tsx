import { Grid, Skeleton, Stack } from '@mui/material'

export default function LoadingPage() {
  return (
    <Stack gap="10px">
      <Skeleton variant="rectangular" width="100%" height={133} />
      <Grid
        display="grid"
        m="10px 0"
        gridTemplateColumns="repeat(auto-fill, 165px)"
        gridAutoRows="auto"
        columnGap="5px"
        rowGap="10px"
        justifyContent="center"
        justifyItems="center"
      >
        {Array.from(Array(10)).map((e, i) => (
          <Skeleton key={i} variant="rectangular" width={'100%'} height={225} />
        ))}
      </Grid>
    </Stack>
  )
}
