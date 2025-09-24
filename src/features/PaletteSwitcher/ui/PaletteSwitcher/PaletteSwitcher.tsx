import { useCallback } from 'react'
import { Palette } from '@/shared/constants/theme'
import { PaletteComponent } from '../../ui/Palette/Palette'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { paletters } from '../../model/consts/paletters'
import { useAppearance } from '@/shared/hooks/useAppearance/useAppearance'

export const PaletteSwitcher = () => {
    const { palette, togglePalette } = useAppearance()

    const onToggleHandlerPalette = useCallback(
        (palette: Palette) => {
            togglePalette(palette)
        },
        [togglePalette],
    )

    return (
        <HStack max wrap="wrap">
            {paletters.map((item) => (
                <PaletteComponent
                    palette={item}
                    onClick={onToggleHandlerPalette}
                    selected={palette === item.style}
                />
            ))}
        </HStack>
    )
}
