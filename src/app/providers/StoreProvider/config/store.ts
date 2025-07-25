import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { createReducerManager } from './reducerManager'
import { StateSchema, ThunkExtraArg } from './StateSchema'
import { rtkApi } from '@/shared/api/rtkApi'
import { $api } from '@/shared/api/api'
import { userReducer } from '@/entities/User'
import { dialogListReducer } from '@/widgets/Sidebar'

export const createReduxStore = (
    asyncReducers?: ReducersMapObject<StateSchema>,
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        dialogList: dialogListReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    // redux code spliting
    const reducerManager = createReducerManager(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api,
    }

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        devTools: __IS_DEV__,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(rtkApi.middleware),
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDisptach = ReturnType<typeof createReduxStore>['dispatch']
