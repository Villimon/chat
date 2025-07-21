import { FC, memo, useMemo } from 'react'
import { routeSidebarConfig } from '../config/routeConfig'
import { SidebarRouterType } from '@/shared/constants/routes'

interface SidebarRouterProps {
    hash: string
}

export const SidebarRouter: FC<SidebarRouterProps> = memo(({ hash }) => {
    return useMemo(() => {
        return routeSidebarConfig[hash as SidebarRouterType]
    }, [hash])
})
