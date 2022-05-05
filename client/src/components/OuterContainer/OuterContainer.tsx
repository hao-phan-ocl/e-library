import { Container, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav'

export default function OuterContainer() {
  return (
    <Container maxWidth="md">
      <Stack minHeight="100vh">
        <Nav />
        <Outlet />
        <Footer />
      </Stack>
    </Container>
  )
}
