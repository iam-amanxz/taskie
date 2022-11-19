import { combineReducers } from 'redux'
import { authApi, taskApi } from '../api'
import { sessionReducer } from './session/reducer'

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  session: sessionReducer,
})

export type RootState = ReturnType<typeof combinedReducer>
export { combinedReducer as reducer }
