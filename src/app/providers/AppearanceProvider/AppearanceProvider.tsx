import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    DialogLayout,
    FolderType,
    Palette,
    Theme,
} from '@/shared/constants/theme'
import {
    LOCAL_STORAGE_DIALOG_LAYOUT_KEY,
    LOCAL_STORAGE_FOLDER_TYPE_KEY,
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
const defaultFolderType = localStorage.getItem(
    LOCAL_STORAGE_FOLDER_TYPE_KEY,
) as FolderType

const AppearanceProvider = ({ children }: AppearanceProviderProps) => {
    const [isThemeInited, setThemeInited] = useState(false)
    const [isPaletteInited, setPaletteInited] = useState(false)
    const [isDialogLayoutInited, setDialogLayoutInited] = useState(false)
    const [isFolderTypeInited, setFolderTypeInited] = useState(false)
    const userData = useSelector(getUserData)
    const userTheme = userData?.settings.appearance?.theme as Theme
    const userPalette = userData?.settings.appearance?.palette as Palette
    const userDialogLayout = userData?.settings.appearance
        ?.dialogLayout as DialogLayout
    const userFolderType = userData?.settings.appearance
        ?.folderType as FolderType

    const [theme, setTheme] = useState<Theme>(
        userTheme || defaultTheme || Theme.LIGHT,
    )
    const [palette, setPalette] = useState<Palette>(
        userPalette || defaultPalette || Palette.APP_PALETTE_GREEN,
    )
    const [dialogLayout, setDialogLayout] = useState<DialogLayout>(
        userDialogLayout || defaultDialogLayout || DialogLayout.EXPANDED,
    )
    const [folderType, setFolderType] = useState<FolderType>(
        userFolderType || defaultFolderType || FolderType.PANEL_TOP,
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
        if (!isFolderTypeInited && userFolderType) {
            setFolderType(userFolderType)
            setFolderTypeInited(true)
        }
    }, [isFolderTypeInited, userFolderType])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
        localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, palette)
        localStorage.setItem(LOCAL_STORAGE_DIALOG_LAYOUT_KEY, dialogLayout)
        localStorage.setItem(LOCAL_STORAGE_FOLDER_TYPE_KEY, folderType)
    }, [theme, palette, dialogLayout, folderType])

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
            palette,
            setPalette,
            dialogLayout,
            setDialogLayout,
            folderType,
            setFolderType,
        }),
        [theme, palette, dialogLayout, folderType],
    )

    return (
        <AppearanceContext.Provider value={defaultProps}>
            {children}
        </AppearanceContext.Provider>
    )
}

export default AppearanceProvider
