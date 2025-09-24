import { DialogLayoutToggle } from '@/features/DialogLayoutToggle'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'

export const DialogLayoutSelector = () => {
    return (
        <VStack gap="8" max>
            <Text text=" Список чатов" variant="secondary" />
            <DialogLayoutToggle />
        </VStack>
    )
}
