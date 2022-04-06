import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'
import BookInfo from './pages/BookInfo'
import AuthorInfo from './pages/AuthorInfo'
import theme from './theme/theme'
import Favorite from './pages/Favorite'
import Profile from './pages/Profile'
import getProfile from './redux/auth/actions'
import Nav from './components/Nav/Nav'
import './App.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile()) // refetch user profile every F5
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:bookId" element={<BookInfo />} />
          <Route path="/author/:authorName" element={<AuthorInfo />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/book-add" element={<AddBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
