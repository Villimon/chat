import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { Link } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { AboutPage } from './pages/AboutPage'
import { Suspense } from 'react'

const App = () => {
    return (
        <div className="app">
            <Link to="/">Главная</Link>
            <Link to="/about">О сайте</Link>
            <Suspense fallback={<div>Loading</div>}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
