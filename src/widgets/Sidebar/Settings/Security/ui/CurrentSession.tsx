import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import { Session as SessionType } from '@/features/SessionManagement'
import { Button } from '@/shared/ui/Button'
import { Session } from './Session'

interface CurrentSessionProps {
    currentSession?: SessionType
    onClick: () => void
}

export const CurrentSession = ({
    currentSession,
    onClick,
}: CurrentSessionProps) => {
    return (
        <VStack gap="8">
            <Text text="Текушая сессия" variant="secondary" />
            <Session session={currentSession} />
            <Button variant="clear" color="error" onClick={onClick}>
                Завершить все оставшиеся сессии
            </Button>
        </VStack>
    )
}
