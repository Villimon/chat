import { FolderTypeSwitcher } from '@/features/FolderTypeSwitcher'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'

export const FolderType = () => {
    return (
        <VStack gap="8" max>
            <Text text="Вид папок" variant="secondary" />
            <FolderTypeSwitcher />
        </VStack>
    )
}
