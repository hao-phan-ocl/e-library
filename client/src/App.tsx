import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import BookEdit from './pages/BookEdit'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'
import BookInfo from './pages/BookInfo'
import AuthorInfo from './pages/AuthorInfo'
import theme from './theme/theme'
import Favorite from './pages/Favorite'
import Profile from './pages/Profile'
import getProfile from './redux/auth/actions'
import OuterContainer from './components/OuterContainer/OuterContainer'
import './App.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile()) // refetch user profile every F5
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* OuterContainer to apply Container maxWidth to all children except Login page */}
          <Route element={<OuterContainer />}>
            <Route path="/" element={<Home />} />
            <Route path="/book/:bookId" element={<BookInfo />} />
            <Route path="/author/:authorName" element={<AuthorInfo />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorite />} />
              <Route path="/book-edit/:bookId" element={<BookEdit />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
