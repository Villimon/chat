export type FolderType = {
    value: string
    title: string
}

export type AppearanceType = {
    theme?: 'app_dark_theme' | 'app_light_theme'
    messageDisplay?: 'with_background' | 'without_background'
    palette?:
        | 'app_palette_green'
        | 'app_palette_lime'
        | 'app_palette_tael'
        | 'app_palette_blue'
        | 'app_palette_indigo'
        | 'app_palette_orange'
        | 'app_palette_test'
    dialogLayout?: 'expanded' | 'compact'
}

export type SettingsType = {
    appearance?: AppearanceType
    language?: 'ru' | 'en'
}

export interface User {
    id: string
    username: string
    avatar?: string
    firstName: string
    lastName: string
    folders?: FolderType[]
    settings: SettingsType
    token: string
}

// TODO: вынесити потом  в нужно место
export interface Messages {
    id: string
    dialogId: string
    text: string
    senderId: string
    timestamp: string
    status: 'delivered' | 'read'
    attachments?: any[]
}

export interface UserSchema {
    authData?: User
    _inited: boolean
}
