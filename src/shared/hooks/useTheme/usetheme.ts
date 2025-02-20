import { useContext } from 'react'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Palette, Theme } from '@/shared/constants/theme'
import {
    LOCAL_STORAGE_PALETTE_KEY,
    LOCAL_STORAGE_THEME_KEY,
} from '@/shared/constants/localstorage'

interface UseThemeResult {
    theme: Theme
    toggleTheme: (theme: Theme) => void
    palette: Palette
    togglePalette: (palette: Palette) => void
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme, palette, setPalette } = useContext(ThemeContext)

    const toggleTheme = (theme: Theme) => {
        const newTheme = theme
        setTheme?.(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme as Theme)
    }

    const togglePalette = (palette: Palette) => {
        const newPalette = palette
        setPalette?.(newPalette)
        localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, newPalette as Palette)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
        palette: palette || Palette.APP_PALETTE_GREEN,
        togglePalette,
    }
}
