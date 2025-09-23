import { useCallback } from 'react'
import { Palette } from '@/shared/constants/theme'
import { useTheme } from '@/shared/hooks/useTheme/useTheme'
import { PaletteComponent } from '../../ui/Palette/Palette'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { paletters } from '../../model/consts/paletters'

export const PaletteSwitcher = () => {
    const { palette, togglePalette } = useTheme()

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
