/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/jsx-wrap-multilines */
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'
import './styles/index.scss'
import { Suspense } from 'react'
import { MainPage } from '@/pages/MainPage'
import { AboutPage } from '@/pages/AboutPage'
import classes from './App.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/hooks/useTheme/usetheme'
import { PaletteSwitcher } from '@/features/PaletteSwitcher'
import { Text } from '@/shared/ui/Text/Text'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { MainLayout } from '@/shared/layout/MainLayout'

const App = () => {
    const { theme, toggleTheme, palette, togglePalette } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const { hash } = location
    const addHash = (hash: string) => {
        navigate(`${location.pathname}${hash}`)
    }

    // TODO: Поправить цвета темной темы

    return (
        <div className={cn('app', {}, [theme, palette])}>
            <MainLayout
                content={
                    <Suspense fallback={<div>123</div>}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route
                                path="/setting"
                                element={<div>setting</div>}
                            />
                            <Route
                                path="/main"
                                element={
                                    <div className={classes.test}>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Quasi sint eligendi
                                        sequi animi, quo mollitia laboriosam
                                        voluptatem alias eius? Libero deserunt
                                        optio sequi quos doloribus? Asperiores
                                        commodi laudantium provident? Culpa?
                                    </div>
                                }
                            />
                            <Route path="*" element={<div>123123</div>} />
                        </Routes>
                    </Suspense>
                }
                sidebar={
                    <>
                        {hash === '#music' || hash === '#video' ? (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12,
                                    }}
                                >
                                    <button onClick={() => addHash('#music')}>
                                        music
                                    </button>
                                    <button onClick={() => addHash('#video')}>
                                        video
                                    </button>
                                    <Link to="/music">music</Link>
                                    <Link to="/video">video</Link>
                                </div>
                                <PaletteSwitcher />

                                <ThemeSwitcher />
                            </>
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12,
                                    }}
                                >
                                    <Link to="/">123</Link>
                                    <Link to="/about">about</Link>
                                    <Link to="/setting">setting</Link>
                                    <Link to="/main">main</Link>
                                    <button onClick={() => addHash('#music')}>
                                        music
                                    </button>
                                    <button onClick={() => addHash('#video')}>
                                        video
                                    </button>
                                    <Link to="/music">music</Link>
                                    <Link to="/video">video</Link>
                                </div>
                                <PaletteSwitcher />
                                <div>
                                    <Text
                                        title="asdasdsa"
                                        size="xl"
                                        variant="secondary"
                                    />
                                    <Text
                                        text="qwewqeqwe"
                                        size="xl"
                                        variant="secondary"
                                    />
                                    <Text
                                        label="zxczxczxc"
                                        size="xl"
                                        variant="secondary"
                                    />
                                </div>
                            </>
                        )}
                    </>
                }
            />
        </div>
    )
}

export default App
