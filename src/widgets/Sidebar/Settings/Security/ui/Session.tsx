import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import { Session as SessionType } from '@/features/SessionManagement'

interface SessionProps {
    session?: SessionType
}

export const Session = ({ session }: SessionProps) => {
    return (
        <VStack max gap="4">
            <Text title={session?.platform} />
            <Text
                text={format(
                    session?.last_activity_at ?? '',
                    "d MMMM yyyy' г.' в HH:mm",
                    { locale: ru },
                )}
                size="s"
            />
            <Text text={`${session?.os}/${session?.browser}`} />
        </VStack>
    )
}
