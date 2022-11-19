import { createSelector } from 'reselect'
import { authApi, taskApi } from '../api'

export const selectTasksResult = taskApi.endpoints.fetchAllTasks.select()
export const selectUserResult = authApi.endpoints.fetchUserProfile.select()

export const selectAllTasks = createSelector(
  selectTasksResult,
  (result) => result?.data?.payload ?? [],
)

export const selectAllActiveTasks = createSelector(
  selectTasksResult,
  (result) => result?.data?.payload?.filter((task) => !task.completed) ?? [],
)

export const selectAllCompletedTasks = createSelector(
  selectTasksResult,
  (result) => result?.data?.payload?.filter((task) => task.completed) ?? [],
)

export const selectAllExpiredTasks = createSelector(
  selectTasksResult,
  (result) => result?.data?.payload?.filter((task) => task.expired) ?? [],
)

export const selectUser = createSelector(
  selectUserResult,
  (result) => result?.data?.payload,
)
