import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import Login from './pages/Login'
import Home from './pages/Home'
import BookAdd from './pages/BookAdd'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'
import BookInfo from './pages/BookInfo'
import AuthorInfo from './pages/AuthorInfo'
import theme from './theme/theme'
import Favorite from './pages/Favorite'
import Profile from './pages/Profile'
import './App.scss'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book/:bookId" element={<BookInfo />} />
          <Route path="/author/:authorName" element={<AuthorInfo />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/book-add" element={<BookAdd />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
