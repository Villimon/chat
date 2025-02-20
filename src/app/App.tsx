import { Route, Routes, Link } from 'react-router-dom'
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

const App = () => {
    const { theme, toggleTheme, palette, togglePalette } = useTheme()

    return (
        <div className={cn('app', {}, [theme, palette])}>
            <Link to="/">123</Link>
            <Link to="/about">123</Link>

            <div className={classes.test}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
                sint eligendi sequi animi, quo mollitia laboriosam voluptatem
                alias eius? Libero deserunt optio sequi quos doloribus?
                Asperiores commodi laudantium provident? Culpa?
            </div>

            <PaletteSwitcher />

            <div>
                <Text title="asdasdsa" size="m" variant="secondary" />
                <Text text="qwewqeqwe" size="s" variant="secondary" />
                <Text label="zxczxczxc" size="xl" variant="secondary" />
            </div>

            <ThemeSwitcher />

            <Suspense fallback={<div>123</div>}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
