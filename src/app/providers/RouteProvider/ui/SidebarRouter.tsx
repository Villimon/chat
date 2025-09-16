import { FC, memo, Suspense, useMemo } from 'react'
import { routeSidebarConfig } from '../config/routeConfig'
import { SidebarRouterType } from '@/shared/constants/routes'
import { Loader } from '@/shared/ui/Loader/Loader'

interface SidebarRouterProps {
    hash: string
}

export const SidebarRouter: FC<SidebarRouterProps> = memo(({ hash }) => {
    return useMemo(() => {
        const content = routeSidebarConfig[hash as SidebarRouterType]
        return (
            <Suspense key={hash} fallback={<Loader />}>
                {content}
            </Suspense>
        )
    }, [hash])
})
