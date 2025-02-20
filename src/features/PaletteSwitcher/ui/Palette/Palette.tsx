import { memo } from 'react'
import { Palette } from '@/shared/constants/theme'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Palette.module.scss'

type PaletteStyle =
    | 'blue'
    | 'green'
    | 'indigo'
    | 'lime'
    | 'orange'
    | 'tael'
    | 'test'

const mapPaletteToStyle: Record<Palette, PaletteStyle> = {
    app_palette_blue: 'blue',
    app_palette_green: 'green',
    app_palette_indigo: 'indigo',
    app_palette_lime: 'lime',
    app_palette_orange: 'orange',
    app_palette_tael: 'tael',
    app_palette_test: 'test',
}

type PaletteType = {
    id: string
    style: Palette
}

interface PalettePropsType {
    palette: PaletteType
    onClick: (palette: Palette) => void
    selected: boolean
}

export const PaletteComponent = memo(
    ({ palette: item, onClick, selected }: PalettePropsType) => {
        const paletteStyle = mapPaletteToStyle[item.style]

        return (
            <div
                className={cn(cls.container, { [cls.selected]: selected }, [])}
            >
                <button
                    onClick={() => onClick(item.style)}
                    type="button"
                    className={cn(cls.palette, {}, [cls[paletteStyle]])}
                />
            </div>
        )
    },
)
