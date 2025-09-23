import { PaletteSwitcher } from '@/features/PaletteSwitcher'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'

export const PaletteSelector = () => {
    return (
        <VStack gap="8" max>
            <Text text="Акцентный цвет" variant="secondary" />
            <PaletteSwitcher />
        </VStack>
    )
}
