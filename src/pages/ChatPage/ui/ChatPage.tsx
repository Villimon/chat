import { memo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import cls from './ChatPage.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'

const ChatPage = memo(() => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                navigate(
                    { pathname: '/', hash: location.hash },
                    { replace: true },
                )
            }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [location.hash, navigate])

    return (
        <main className={cn(cls.ChatPage, {}, [])}>
            <div className={cn(cls.header, {}, [])}>asdsad</div>
            <div className={cn(cls.chat, {}, [])}>asdsad</div>
            <div className={cn(cls.footer, {}, [])}>asdsad</div>
        </main>
    )
})

export default ChatPage
