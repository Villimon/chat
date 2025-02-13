import { Route, Routes, Link } from 'react-router-dom'
import './styles/index.scss'
import { Suspense } from 'react'
import { MainPage } from '@/pages/MainPage'
import { AboutPage } from '@/pages/AboutPage'
import classes from './App.module.scss'

const App = () => (
    <div className="app app_light_theme app_palette_lime">
        <Link to="/">123</Link>
        <Link to="/about">123</Link>
        <div className={classes.test}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi sint
            eligendi sequi animi, quo mollitia laboriosam voluptatem alias eius?
            Libero deserunt optio sequi quos doloribus? Asperiores commodi
            laudantium provident? Culpa?
        </div>
        <Suspense fallback={<div>123</div>}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Suspense>
    </div>
)

export default App
