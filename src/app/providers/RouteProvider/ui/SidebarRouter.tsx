import { Suspense } from 'react'
import { Location } from 'react-router-dom'
import { routeSidebarConfig } from '../config/routeConfig'
import { SidebarRouterType } from '@/shared/constants/routes'

export const SidebarRouter = ({ hash, key }: Location) => {
    return (
        // TODO: Сделать лоадер
        <Suspense key={key} fallback={<div>Loading...</div>}>
            {routeSidebarConfig[hash as SidebarRouterType]}
        </Suspense>
    )
}
