import { StateSchema } from '@/app/providers/StoreProvider'

export const getRemember = (state: StateSchema) =>
    state.loginForm?.remember || false
