/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/jsx-wrap-multilines */
import { useLocation, useNavigate } from 'react-router-dom'
import './styles/index.scss'
import { cn } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/hooks/useTheme/usetheme'
import { MainLayout } from '@/shared/layout/MainLayout'
import { ErrorBoundary } from './providers/ErrorBoundary'
import { AppRouter, SidebarRouter } from './providers/RouteProvider'

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
    const { theme, palette } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const addHash = (hash: string) => {
        navigate(`${location.pathname}${hash}`)
    }

    // TODO: Поправить цвета темной темы

    return (
        <div className={cn('app', {}, [theme, palette])}>
            <ErrorBoundary>
                <MainLayout
                    content={<AppRouter {...location} />}
                    sidebar={
                        <SidebarRouter {...location} />
                        // <>
                        //     {hash === '#music' || hash === '#video' ? (
                        //         <>
                        //             <div
                        //                 style={{
                        //                     display: 'flex',
                        //                     flexDirection: 'column',
                        //                     gap: 12,
                        //                 }}
                        //             >
                        //                 <button
                        //                     onClick={() => addHash('#music')}
                        //                 >
                        //                     music
                        //                 </button>
                        //                 <button
                        //                     onClick={() => addHash('#video')}
                        //                 >
                        //                     video
                        //                 </button>
                        //                 <Link to="/music">music</Link>
                        //                 <Link to="/video">video</Link>
                        //             </div>
                        //             <PaletteSwitcher />

                        //             <ThemeSwitcher />
                        //         </>
                        //     ) : (
                        //         <>
                        //             <div
                        //                 style={{
                        //                     display: 'flex',
                        //                     flexDirection: 'column',
                        //                     gap: 12,
                        //                 }}
                        //             >
                        //                 <Link to="/">123</Link>
                        //                 <Link to="/chat/32">chat</Link>
                        //                 <Link to="/login">login</Link>
                        //                 <Link to="/registration">
                        //                     registration
                        //                 </Link>
                        //                 <button
                        //                     onClick={() => addHash('#music')}
                        //                 >
                        //                     music
                        //                 </button>
                        //                 <button
                        //                     onClick={() => addHash('#video')}
                        //                 >
                        //                     video
                        //                 </button>
                        //                 <Link to="/music">music</Link>
                        //                 <Link to="/video">video</Link>
                        //             </div>
                        //             <PaletteSwitcher />
                        //             <div>
                        //                 <Text
                        //                     title="asdasdsa"
                        //                     size="xl"
                        //                     variant="secondary"
                        //                 />
                        //                 <Text
                        //                     text="qwewqeqwe"
                        //                     size="xl"
                        //                     variant="secondary"
                        //                 />
                        //                 <Text
                        //                     label="zxczxczxc"
                        //                     size="xl"
                        //                     variant="secondary"
                        //                 />
                        //             </div>
                        //         </>
                        //     )}
                        // </>
                    }
                />
            </ErrorBoundary>
        </div>
    )
}

export default App
