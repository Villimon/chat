import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Palette, Theme } from '@/shared/constants/theme'
import {
    LOCAL_STORAGE_PALETTE_KEY,
    LOCAL_STORAGE_THEME_KEY,
} from '@/shared/constants/localstorage'
import { getUserData } from '@/entities/User'

interface ThemeProviderProps {
    children: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
const defaultPalette = localStorage.getItem(
    LOCAL_STORAGE_PALETTE_KEY,
) as Palette

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const userData = useSelector(getUserData)
    const userTheme = userData?.settings.appearance?.theme as Theme
    const userPalette = userData?.settings.appearance?.palette as Palette

    const [theme, setTheme] = useState<Theme>(
        userTheme || defaultTheme || Theme.LIGHT,
    )
    const [palette, setPalette] = useState<Palette>(
        userPalette || defaultPalette || Palette.APP_PALETTE_GREEN,
    )

    useEffect(() => {
        if (userTheme) {
            setTheme(userTheme)
        }
    }, [userTheme])

    useEffect(() => {
        if (userPalette) {
            setPalette(userPalette)
        }
    }, [userPalette])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
        localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, palette)
    }, [theme, palette])

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
