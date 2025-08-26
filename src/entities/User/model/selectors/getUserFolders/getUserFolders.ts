import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserFolders = (state: StateSchema) =>
    state.user.authData?.folders
