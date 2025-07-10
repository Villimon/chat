import { Suspense } from 'react'
import { Location } from 'react-router-dom'
import { routeSidebarConfig } from '../config/routeConfig'
import { SidebarRouterType } from '@/shared/constants/routes'
import { Loader } from '@/shared/ui/Loader/Loader'

export const SidebarRouter = ({ hash, key }: Location) => {
    return (
        // TODO: Сделать лоадер
        <Suspense key={key} fallback={<Loader />}>
            {routeSidebarConfig[hash as SidebarRouterType]}
        </Suspense>
    )
}
