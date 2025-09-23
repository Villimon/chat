import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Palette, Theme } from '@/shared/constants/theme'
import {
    LOCAL_STORAGE_PALETTE_KEY,
    LOCAL_STORAGE_THEME_KEY,
} from '@/shared/constants/localstorage'
import { useSetUserSettings } from '@/entities/User/api/userApi'
import { getUserData } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { initAuthData } from '@/entities/User/model/services/initAuthData'

interface UseThemeResult {
    theme: Theme
    toggleTheme: (theme: Theme) => void
    palette: Palette
    togglePalette: (palette: Palette) => void
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme, palette, setPalette } = useContext(ThemeContext)
    const [setUserSettings] = useSetUserSettings()
    const userData = useSelector(getUserData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.body.classList.add(theme || Theme.LIGHT)
        document.body.classList.add(palette || Palette.APP_PALETTE_GREEN)

        return () => {
            document.body.classList.remove(theme || Theme.LIGHT)
            document.body.classList.remove(palette || Palette.APP_PALETTE_GREEN)
        }
    }, [theme, palette])

    const toggleTheme = (theme: Theme) => {
        const newTheme = theme
        setTheme?.(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme as Theme)
        setUserSettings({
            userId: userData?.id ?? '',
            userSettings: { appearance: { theme: newTheme } },
        })
        dispatch(initAuthData())
    }

    const togglePalette = (palette: Palette) => {
        const newPalette = palette
        setPalette?.(newPalette)
        localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, newPalette as Palette)
        setUserSettings({
            userId: userData?.id ?? '',
            userSettings: { appearance: { palette: newPalette } },
        })
        dispatch(initAuthData())
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
        palette: palette || Palette.APP_PALETTE_GREEN,
        togglePalette,
    }
}
