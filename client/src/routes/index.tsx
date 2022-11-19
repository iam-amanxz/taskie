import { createBrowserRouter } from 'react-router-dom'
import {
  PATH_AUTH,
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_ROOT,
} from '../constants/routes'
import {
  LoginScreen,
  RegisterScreen,
  TasksListScreen,
  NotFoundSrceen,
} from '../containers'
import { AuthRoute } from './AuthRoute'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <ProtectedRoute />,
    errorElement: <NotFoundSrceen />,
    children: [
      {
        path: PATH_ROOT,
        element: <TasksListScreen />,
      },
    ],
  },

  {
    path: PATH_AUTH,
    element: <AuthRoute />,
    children: [
      {
        path: PATH_REGISTER,
        element: <RegisterScreen />,
      },
      {
        path: PATH_LOGIN,
        element: <LoginScreen />,
      },
    ],
  },
])
