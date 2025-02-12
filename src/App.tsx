import { Route, Routes, Link } from 'react-router-dom'
import './styles/index.scss'
import { Suspense } from 'react'
import { TestComponent } from '@/components/TestComponent'
import { MainPage } from '@/pages/MainPage'
import { AboutPage } from '@/pages/AboutPage'

const App = () => (
    <div className="app">
        <Link to="/">123</Link>
        <Link to="/about">123</Link>
        <TestComponent />
        <Suspense fallback={<div>123</div>}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Suspense>
    </div>
)

export default App
