import { lazy } from 'react'

export const ChatPageAsync = lazy(
    () =>
        new Promise((res) => {
            // @ts-ignore
            setTimeout(() => res(import('./ChatPage')), 1000)
        }),
)
