import React, { useCallback } from 'react'
import { Location, Route, Routes } from 'react-router-dom'
import { AppRouterProps } from '@/shared/types/router'
// eslint-disable-next-line project-my-plugin/layer-imports
import { routeAppConfig } from '@/app/providers/RouteProvider/config/routeConfig'

export const AppRouter = ({ key }: Location) => {
    const renderWithWrapper = useCallback((route: AppRouterProps) => {
        return (
            <Route key={route.path} path={route.path} element={route.element} />
        )
    }, [])

    return (
        <React.Suspense key={key} fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routeAppConfig).map(renderWithWrapper)}
            </Routes>
        </React.Suspense>
    )
}
