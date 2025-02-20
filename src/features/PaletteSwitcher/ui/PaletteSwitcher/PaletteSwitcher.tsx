import { useCallback } from 'react'
import { Palette } from '@/shared/constants/theme'
import { useTheme } from '@/shared/hooks/useTheme/usetheme'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './PaletteSwitcher.module.scss'
import { PaletteComponent } from '../../ui/Palette/Palette'

// TODO: Подумать чтобы вынести это в отдельное место
const paletters = [
    {
        id: '1',
        style: Palette.APP_PALETTE_GREEN,
    },
    {
        id: '2',
        style: Palette.APP_PALETTE_LIME,
    },
    {
        id: '3',
        style: Palette.APP_PALETTE_TAEL,
    },
    {
        id: '4',
        style: Palette.APP_PALETTE_BLUE,
    },
    {
        id: '5',
        style: Palette.APP_PALETTE_INDIGO,
    },
    {
        id: '6',
        style: Palette.APP_PALETTE_ORANGE,
    },
    {
        id: '7',
        style: Palette.APP_PALETTE_TEST,
    },
]

export const PaletteSwitcher = () => {
    const { palette, togglePalette } = useTheme()

    const onToggleHandlerPalette = useCallback(
        (palette: Palette) => {
            togglePalette(palette)
        },
        [togglePalette],
    )

    return (
        <div className={cn(cls.paletteSwitcher, {}, [])}>
            {paletters.map((item) => (
                <PaletteComponent
                    palette={item}
                    onClick={onToggleHandlerPalette}
                    selected={palette === item.style}
                />
            ))}
        </div>
    )
}
