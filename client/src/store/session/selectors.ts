import { createSelector } from 'reselect'
import { RootState } from '../reducers'
import { initialState } from './reducer'

export const sessionDomain = (state: RootState) => state.session || initialState

export const selectSession = createSelector(
  sessionDomain,
  (subState) => subState.session,
)
