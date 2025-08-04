import { StateSchema } from '@/app/providers/StoreProvider'

export const getSearchQuery = (state: StateSchema) => state.sidebar.searchQuery
