import { memo, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cls from './ChatPage.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'
import { HeaderChat } from './HeaderChat/HeaderChat'
import { getUserData } from '@/entities/User'
import { Loader } from '@/shared/ui/Loader/Loader'
import { useGetDialogById } from '@/entities/Dialog/api/DialogApi'
import { FooterChat } from './FooterChat/FooterChat'

const ChatPage = memo(() => {
    const userData = useSelector(getUserData)
    const location = useLocation()
    const navigate = useNavigate()

    const dialogId = useParams()

    const { data, isError, isFetching } = useGetDialogById({
        dialogId: dialogId.id ?? '',
        userId: userData?.id ?? '',
    })

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

    if (isFetching) {
        return <Loader />
    }

    return (
        <main className={cn(cls.ChatPage, {}, [])}>
            <HeaderChat className={cls.header} dialogInfo={data} />
            <div className={cn(cls.chat, {}, [])}>asdsad</div>
            <FooterChat className={cls.footer} />
        </main>
    )
})

export default ChatPage
