import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'

export const getActiveFolder = createSelector(
    (state: StateSchema) => state.sidebar.activeFolder,
    (activeFolder) => activeFolder,
)
