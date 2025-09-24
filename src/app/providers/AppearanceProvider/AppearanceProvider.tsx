import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { DialogLayout, Palette, Theme } from '@/shared/constants/theme'
import {
    LOCAL_STORAGE_DIALOG_LAYOUT_KEY,
    LOCAL_STORAGE_PALETTE_KEY,
    LOCAL_STORAGE_THEME_KEY,
} from '@/shared/constants/localstorage'
import { getUserData } from '@/entities/User'
import { AppearanceContext } from '@/shared/lib/context/AppearanceContext'

interface AppearanceProviderProps {
    children: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
const defaultPalette = localStorage.getItem(
    LOCAL_STORAGE_PALETTE_KEY,
) as Palette
const defaultDialogLayout = localStorage.getItem(
    LOCAL_STORAGE_DIALOG_LAYOUT_KEY,
) as DialogLayout

const AppearanceProvider = ({ children }: AppearanceProviderProps) => {
    const [isThemeInited, setThemeInited] = useState(false)
    const [isPaletteInited, setPaletteInited] = useState(false)
    const [isDialogLayoutInited, setDialogLayoutInited] = useState(false)
    const userData = useSelector(getUserData)
    const userTheme = userData?.settings.appearance?.theme as Theme
    const userPalette = userData?.settings.appearance?.palette as Palette
    const userDialogLayout = userData?.settings.appearance
        ?.dialogLayout as DialogLayout

    const [theme, setTheme] = useState<Theme>(
        userTheme || defaultTheme || Theme.LIGHT,
    )
    const [palette, setPalette] = useState<Palette>(
        userPalette || defaultPalette || Palette.APP_PALETTE_GREEN,
    )
    const [dialogLayout, setDialogLayout] = useState<DialogLayout>(
        userDialogLayout || defaultDialogLayout || DialogLayout.EXPANDED,
    )

    useEffect(() => {
        if (!isThemeInited && userTheme) {
            setTheme(userTheme)
            setThemeInited(true)
        }
    }, [userTheme, isThemeInited])

    useEffect(() => {
        if (!isPaletteInited && userPalette) {
            setPalette(userPalette)
            setPaletteInited(true)
        }
    }, [userPalette, isPaletteInited])

    useEffect(() => {
        if (!isDialogLayoutInited && userDialogLayout) {
            setDialogLayout(userDialogLayout)
            setDialogLayoutInited(true)
        }
    }, [userDialogLayout, isDialogLayoutInited])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
        localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, palette)
        localStorage.setItem(LOCAL_STORAGE_DIALOG_LAYOUT_KEY, dialogLayout)
    }, [theme, palette, dialogLayout])

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
            palette,
            setPalette,
            dialogLayout,
            setDialogLayout,
        }),
        [theme, palette, dialogLayout],
    )

    return (
        <AppearanceContext.Provider value={defaultProps}>
            {children}
        </AppearanceContext.Provider>
    )
}

export default AppearanceProvider
