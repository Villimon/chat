import { StateSchema } from '@/app/providers/StoreProvider'

export const getActiveFolder = (state: StateSchema) =>
    state.sidebar.activeFolder
