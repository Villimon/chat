import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import { FoldersManagement } from '@/features/FoldersManagement'

export const ActiveFolders = () => {
    return (
        <VStack gap="8" max>
            <Text text="Активные папки" variant="secondary" />
            <FoldersManagement />
        </VStack>
    )
}
