import { JSX } from 'react'

import {
    AppRouter,
    getRouteChat,
    getRouteLogin,
    getRouteMain,
    getRouteRegistration,
    SidebarRouterType,
} from '@/shared/constants/routes'
import { AppRouterProps } from '@/shared/types/router'
import {
    Settings,
    Appearence,
    Folders,
    General,
    Profile,
    Security,
    Notification,
    Sidebar,
} from '@/widgets/Sidebar'
import { MainPage } from '@/pages/MainPage'
import { ChatPage } from '@/pages/ChatPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegistrationPage } from '@/pages/RegistrationPage'

export const routeAppConfig: Record<AppRouter, AppRouterProps> = {
    [AppRouter.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,
    },
    [AppRouter.CHAT]: {
        path: getRouteChat(':id'),
        element: <ChatPage />,
        authOnly: true,
    },
    [AppRouter.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRouter.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />,
    },
    [AppRouter.NOT_FOUND]: {
        path: '*',
        element: <></>,
    },
}

export const routeSidebarConfig: Record<SidebarRouterType, JSX.Element> = {
    [SidebarRouterType.SIDEBAR]: <Sidebar />,
    [SidebarRouterType.SETTINGS]: <Settings />,
    [SidebarRouterType.SETTINGS_APPEARENCE]: <Appearence />,
    [SidebarRouterType.SETTINGS_FOLDERS]: <Folders />,
    [SidebarRouterType.SETTINGS_GENERAL]: <General />,
    [SidebarRouterType.SETTINGS_NOTIFICATION]: <Notification />,
    [SidebarRouterType.SETTINGS_PROFILE]: <Profile />,
    [SidebarRouterType.SETTINGS_SECUTITY]: <Security />,
    [SidebarRouterType.SETTINGS_STATUS]: <div>asdasdsa</div>,
}
