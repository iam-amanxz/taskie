import { Navigate, Outlet } from 'react-router'
import { PATH_TASKS } from '../constants/routes'
import { useAppSelector } from '../store'
import { selectSession } from '../store/session/selectors'

export const AuthRoute = () => {
  const session = useAppSelector(selectSession)

  if (session.isAuthenticated) {
    return <Navigate to={PATH_TASKS} replace />
  }

  return <Outlet />
}
