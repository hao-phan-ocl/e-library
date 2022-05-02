import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav'

export default function OuterContainer() {
  return (
    <Container maxWidth="md">
      <Nav />
      <Outlet />
      <Footer />
    </Container>
  )
}
