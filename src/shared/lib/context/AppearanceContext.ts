import { createContext } from 'react'
import {
    DialogLayout,
    FolderType,
    Palette,
    Theme,
} from '@/shared/constants/theme'

export interface AppearanceContextType {
    theme?: Theme
    setTheme?: (theme: Theme) => void
    palette?: Palette
    setPalette?: (palette: Palette) => void
    dialogLayout?: DialogLayout
    setDialogLayout?: (dialogLayout: DialogLayout) => void
    folderType?: FolderType
    setFolderType?: (folderType: FolderType) => void
}

export const AppearanceContext = createContext<AppearanceContextType>({})
