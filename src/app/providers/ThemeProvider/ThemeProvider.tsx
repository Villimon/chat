import { ReactNode, useMemo, useState } from 'react'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Palette, Theme } from '@/shared/constants/theme'
import {
    LOCAL_STORAGE_PALETTE_KEY,
    LOCAL_STORAGE_THEME_KEY,
} from '@/shared/constants/localstorage'

interface ThemeProviderProps {
    children: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
const defaultPalette = localStorage.getItem(
    LOCAL_STORAGE_PALETTE_KEY,
) as Palette

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme || Theme.LIGHT)
    const [palette, setPalette] = useState<Palette>(
        defaultPalette || Palette.APP_PALETTE_GREEN,
    )

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
            palette,
            setPalette,
        }),
        [theme, palette],
    )

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
