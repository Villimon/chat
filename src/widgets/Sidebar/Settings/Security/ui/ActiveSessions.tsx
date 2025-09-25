import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import { Button } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Session } from './Session'
import { Session as SessionType } from '@/features/SessionManagement'

interface ActiveSessionsProps {
    activeSessions?: SessionType[]
    onClick?: (token: string) => void
}

export const ActiveSessions = ({
    activeSessions,
    onClick,
}: ActiveSessionsProps) => {
    return (
        <VStack gap="8" max>
            <Text text="Активные сессии" variant="secondary" />
            {activeSessions?.length ? (
                <VStack gap="24" max>
                    {activeSessions?.map((session) => (
                        <HStack max gap="8">
                            <Session session={session} />
                            <Button
                                variant="clear"
                                color="error"
                                onClick={() => onClick?.(session.session_token)}
                            >
                                Завершить сессию
                            </Button>
                        </HStack>
                    ))}
                </VStack>
            ) : (
                <Text text="Активных сессий нет" align="center" />
            )}
        </VStack>
    )
}
