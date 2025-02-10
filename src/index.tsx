import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '../i18n'

const root = createRoot(document.getElementById('root') as HTMLElement)

if (!root) {
    throw new Error(
        'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение'
    )
}

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
