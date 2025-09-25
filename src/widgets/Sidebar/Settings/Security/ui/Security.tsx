import { memo, useCallback, useMemo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Security.module.scss'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { NavigateBack } from '@/features/NavigateBack'
import {
    useGetSessions,
    useTerminateAllSessions,
    useTerminateSession,
} from '@/features/SessionManagement'
import { TOKEN_LOCAL_STORAGE_KEY } from '@/shared/constants/localstorage'
import { CurrentSession } from './CurrentSession'
import { Loader } from '@/shared/ui/Loader/Loader'
import { ActiveSessions } from './ActiveSessions'

const Security = memo(() => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)

    const { data, isFetching } = useGetSessions()
    const [terminateAllSessions] = useTerminateAllSessions()
    const [terminateSession] = useTerminateSession()

    const currentSession = useMemo(() => {
        return data?.find((item) => item.session_token === token)
    }, [data, token])

    const activeSessions = useMemo(() => {
        return data?.filter((item) => item.session_token !== token)
    }, [data, token])

    const onClickCurrentSessionHandler = useCallback(async () => {
        await terminateAllSessions().unwrap()
    }, [terminateAllSessions])

    const onClickactiveSessionsHandler = useCallback(
        async (token: string) => {
            await terminateSession(token).unwrap()
        },
        [terminateSession],
    )

    if (isFetching) {
        return <Loader />
    }

    return (
        <aside className={cn(cls.securityContainer, {}, [])}>
            <VStack gap="24" max>
                <NavigateBack hash="#settings" />
                <CurrentSession
                    onClick={onClickCurrentSessionHandler}
                    currentSession={currentSession}
                />
                <ActiveSessions
                    activeSessions={activeSessions}
                    onClick={onClickactiveSessionsHandler}
                />
            </VStack>
        </aside>
    )
})

export default Security
