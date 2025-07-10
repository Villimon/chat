import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserData = createSelector(
    (state: StateSchema) => state.user.authData,
    (authData) => authData,
)
