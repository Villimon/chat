import { createContext } from 'react'
import { Palette, Theme } from '@/shared/constants/theme'

export interface ThemeContextType {
    theme?: Theme
    setTheme?: (theme: Theme) => void
    palette?: Palette
    setPalette?: (palette: Palette) => void
}

export const ThemeContext = createContext<ThemeContextType>({})
