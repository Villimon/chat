import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DialogLayout, Palette, Theme } from '@/shared/constants/theme'
import {
    LOCAL_STORAGE_DIALOG_LAYOUT_KEY,
    LOCAL_STORAGE_PALETTE_KEY,
    LOCAL_STORAGE_THEME_KEY,
} from '@/shared/constants/localstorage'
import { useSetUserSettings } from '@/entities/User/api/userApi'
import { getUserData } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { initAuthData } from '@/entities/User/model/services/initAuthData'
import { AppearanceContext } from '@/shared/lib/context/AppearanceContext'

interface useAppearanceResult {
    theme: Theme
    toggleTheme: (theme: Theme) => void
    palette: Palette
    togglePalette: (palette: Palette) => void
    dialogLayout: DialogLayout
    toggleDialogLayout: (dialogLayout: DialogLayout) => void
}

export const useAppearance = (): useAppearanceResult => {
    const {
        theme,
        setTheme,
        palette,
        setPalette,
        dialogLayout,
        setDialogLayout,
    } = useContext(AppearanceContext)

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

    const toggleDialogLayout = (dialogLayout: DialogLayout) => {
        const newDialogLayout = dialogLayout
        setDialogLayout?.(newDialogLayout)
        localStorage.setItem(
            LOCAL_STORAGE_DIALOG_LAYOUT_KEY,
            newDialogLayout as DialogLayout,
        )
        setUserSettings({
            userId: userData?.id ?? '',
            userSettings: { appearance: { dialogLayout: newDialogLayout } },
        })
        dispatch(initAuthData())
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
        palette: palette || Palette.APP_PALETTE_GREEN,
        togglePalette,
        dialogLayout: dialogLayout || DialogLayout.EXPANDED,
        toggleDialogLayout,
    }
}
