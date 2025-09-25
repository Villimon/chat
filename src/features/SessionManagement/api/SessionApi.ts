import { Session } from '../model/types'
import { rtkApi } from '@/shared/api/rtkApi'

export const sessionApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSessions: build.query<Session[], void>({
            query: () => '/user_sessions',
            providesTags: ['Session'],
        }),
        terminateSession: build.mutation<void, string>({
            query: (sessionId) => ({
                url: `/user_sessions/${sessionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Session'],
        }),
        terminateAllSessions: build.mutation<void, void>({
            query: () => ({
                url: '/user_sessions/logout-others',
                method: 'DELETE',
            }),
            invalidatesTags: ['Session'],
        }),
    }),
})

export const useGetSessions = sessionApi.useGetSessionsQuery
export const useTerminateSession = sessionApi.useTerminateSessionMutation
export const useTerminateAllSessions = sessionApi.useTerminateAllSessionsMutation
