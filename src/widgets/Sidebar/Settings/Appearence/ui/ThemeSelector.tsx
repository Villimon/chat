import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'

export const ThemeSelector = () => {
    return (
        <VStack gap="8" max>
            <Text text="Тема оформления" variant="secondary" />
            <ThemeSwitcher />
        </VStack>
    )
}
