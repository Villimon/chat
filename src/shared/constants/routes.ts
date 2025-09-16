export enum AppRouter {
    MAIN = 'main',
    CHAT = 'dialogs',
    LOGIN = 'login',
    REGISTRATION = 'registration',
    NOT_FOUND = 'not_found',
}

export enum SidebarRouterType {
    SIDEBAR = '',
    SETTINGS = '#settings',
    SETTINGS_PROFILE = '#settings.profile',
    SETTINGS_STATUS = '#settings.status',
    SETTINGS_GENERAL = '#settings.general',
    SETTINGS_SECUTITY = '#settings.security',
    SETTINGS_FOLDERS = '#settings.folders',
    SETTINGS_NOTIFICATION = '#settings.notification',
    SETTINGS_APPEARENCE = '#settings.appearence',
}

export const getRouteMain = () => '/'
export const getRouteChat = (id: string) => `/dialogs/${id}`
export const getRouteLogin = () => '/login'
export const getRouteRegistration = () => '/registration'
