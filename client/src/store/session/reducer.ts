import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_KEY } from '../../constants/app'
import { useLocalStorage } from '../../hooks'

export interface SessionState {
  session: {
    isAuthenticated: boolean
    token: string | null
  }
}

const createInitialState = () => {
  const { get } = useLocalStorage()
  const token = get(LOCAL_STORAGE_KEY)
  if (token) {
    return {
      isAuthenticated: true,
      token,
    }
  }
  return {
    isAuthenticated: false,
    token: null,
  }
}

export const initialState: SessionState = { session: createInitialState() }

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (
      state,
      action: PayloadAction<{ token: string | null; isAuthenticated: boolean }>,
    ) => {
      state.session = {
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
      }
    },
    authStateReset: (state) => {
      state = initialState
    },
  },
})

export const { setSession, authStateReset } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
