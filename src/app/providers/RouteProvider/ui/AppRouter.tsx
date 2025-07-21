import React, { FC, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRouterProps } from '@/shared/types/router'
import { routeAppConfig } from '../config/routeConfig'
import { RequierAuth } from './RequierAuth'
import { Loader } from '@/shared/ui/Loader/Loader'

interface AppRouterComponentProps {
    key: string
}

export const AppRouter: FC<AppRouterComponentProps> = ({ key }) => {
    const renderWithWrapper = useCallback((route: AppRouterProps) => {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequierAuth>{route.element}</RequierAuth>
                    ) : (
                        route.element
                    )
                }
            />
        )
    }, [])

    return (
        <React.Suspense key={key} fallback={<Loader />}>
            <Routes>
                {Object.values(routeAppConfig).map(renderWithWrapper)}
            </Routes>
        </React.Suspense>
    )
}
