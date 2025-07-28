import {
    Action,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { rtkApi } from '@/shared/api/rtkApi'
import { LoginSchema } from '@/features/AuthByUsername'
import { UserSchema } from '@/entities/User/model/types/userSchema'
import { SidebarSchema } from '@/widgets/Sidebar'

export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
    loginForm?: LoginSchema
    user: UserSchema
    sidebar: SidebarSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: Action) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
