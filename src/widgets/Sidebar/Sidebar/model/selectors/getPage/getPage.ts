import { StateSchema } from '@/app/providers/StoreProvider'

export const getPage = (state: StateSchema) => state.sidebar.page
