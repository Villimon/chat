import { DisplayMessagesSwitcher } from '@/features/DisplayMessagesSwitcher'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'

export const DisplayingMessages = () => {
    return (
        <VStack gap="8" max>
            <Text text="Отображение сообщений" variant="secondary" />
            <DisplayMessagesSwitcher />
        </VStack>
    )
}
