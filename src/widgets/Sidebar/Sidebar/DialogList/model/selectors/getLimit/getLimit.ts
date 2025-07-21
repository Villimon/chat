import { StateSchema } from '@/app/providers/StoreProvider'

export const getLimit = (state: StateSchema) => state.dialogList.limit
