import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import { createReduxStore } from '../config/store'

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    return <Provider store={createReduxStore()}>{children}</Provider>
}
