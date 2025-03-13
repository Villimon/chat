import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/shared/config/i18n/i18n'
import App from '@/app/App'
import ThemeProvider from '@/app/providers/ThemeProvider/ThemeProvider'
import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider'

const root = createRoot(document.getElementById('root') as HTMLElement)

if (!root) {
    throw new Error(
        'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
    )
}

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
)
