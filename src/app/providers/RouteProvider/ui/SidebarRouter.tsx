import { Suspense } from 'react'
import { Location } from 'react-router-dom'
// eslint-disable-next-line project-my-plugin/layer-imports
import { routeSidebarConfig } from '@/app/providers/RouteProvider/config/routeConfig'
import { SidebarRouterType } from '@/shared/constants/routes'

export const SidebarRouter = ({ hash, key }: Location) => {
    return (
        // TODO: Сделать лоадер
        <Suspense key={key} fallback={<div>Loading...</div>}>
            {routeSidebarConfig[hash as SidebarRouterType]}
        </Suspense>
    )
}
