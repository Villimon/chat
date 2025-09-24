/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/jsx-wrap-multilines */
import { useLocation, useNavigate } from 'react-router-dom'
import './styles/index.scss'
import { useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import { MainLayout } from '@/shared/layout/MainLayout'
import { ErrorBoundary } from './providers/ErrorBoundary'
import { AppRouter, SidebarRouter } from './providers/RouteProvider'
import { getUserData, getUserInited } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { initAuthData } from '@/entities/User/model/services/initAuthData'
import { Loader } from '@/shared/ui/Loader/Loader'
import { useAppearance } from '@/shared/hooks/useAppearance/useAppearance'

// Какие роуты у нас будут
// /chat/:id
// /settings
// /settings.profile
// /settings.general
// /settings.folders
// /settings.notification
// /settings.security
// /settings.appearence
// /settings.answers
// /login
// /registration

const App = () => {
    const { theme, palette } = useAppearance()
    const location = useLocation()
    const navigate = useNavigate()
    const isAuth = useSelector(getUserData)
    const inited = useSelector(getUserInited)
    const dispatch = useAppDispatch()

    // TODO: Поправить цвета темной темы
    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    const sidebar = useMemo(
        () => <SidebarRouter hash={location.hash} />,
        [location.hash],
    )

    const content = useMemo(
        () => <AppRouter key={location.pathname} />,
        [location.pathname],
    )

    return (
        <div id="app" className={cn('app', {}, [theme, palette])}>
            {inited ? (
                <ErrorBoundary>
                    <MainLayout
                        isAuth={Boolean(isAuth)}
                        content={content}
                        sidebar={sidebar}
                    />
                </ErrorBoundary>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default App
