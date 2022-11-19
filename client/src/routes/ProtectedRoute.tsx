import { Navigate, Outlet } from 'react-router'
import { PATH_LOGIN } from '../constants/routes'
import { useAppSelector } from '../store'
import { selectSession } from '../store/session/selectors'

export const ProtectedRoute = () => {
  const session = useAppSelector(selectSession)

  if (!session.isAuthenticated) {
    return <Navigate to={PATH_LOGIN} replace />
  }
  return <Outlet />
}
