import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { RootState } from '../../redux/rootReducer'

export default function PrivateRoutes() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
