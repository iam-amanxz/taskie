import { AppDispatch, AppThunk } from '..'
import { authApi, taskApi } from '../../api'
import { LOCAL_STORAGE_KEY } from '../../constants/app'
import { useLocalStorage } from '../../hooks'
import { setSession, authStateReset } from './reducer'

export const setSessionAction =
  (token: string | null, isAuthenticated: boolean): AppThunk =>
  (dispatch) => {
    const { remove, set } = useLocalStorage()
    if (token) {
      set(LOCAL_STORAGE_KEY, token)
    } else {
      remove(LOCAL_STORAGE_KEY)
    }
    resetApistate(dispatch)
    dispatch(setSession({ token, isAuthenticated }))
  }

export const authStateResetAction = (dispatch: AppDispatch) => {
  const { remove } = useLocalStorage()
  remove(LOCAL_STORAGE_KEY)
  dispatch(authStateReset())
}

export const logoutAction = (): AppThunk => (dispatch) => {
  const { remove } = useLocalStorage()
  remove(LOCAL_STORAGE_KEY)
  resetApistate(dispatch)
  dispatch(setSessionAction(null, false))
}

const resetApistate = (dispatch: any) => {
  dispatch(authApi.util.resetApiState())
  dispatch(taskApi.util.resetApiState())
}
