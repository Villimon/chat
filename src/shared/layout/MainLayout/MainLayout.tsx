import { memo, ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import cls from './MainLayout.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'
import { useMedia } from '@/shared/hooks/useDevice/useDevice'

interface MainLayoutProps {
    className?: string
    sidebar: ReactElement
    content: ReactElement
}

// TODO: Сделать по уму алдаптив с навешиванием класса, нужно навешивать класс хиден только на тот блок который скрываем а не все сразу
export const MainLayout = memo(
    ({ sidebar, content, className }: MainLayoutProps) => {
        const location = useLocation()
        const isHiddenContent = location.pathname === '/'

        const isMobile = useMedia('(max-width: 800px)')

        return (
            <section className={cn(cls.MainLayout, {}, [className])}>
                <div
                    className={cn(
                        cls.sidebar,
                        {
                            [cls.hidden]: !isHiddenContent && isMobile,
                            [cls.sidebarMobile]: isMobile,
                        },
                        [],
                    )}
                >
                    {sidebar}
                </div>
                <section
                    className={cn(
                        cls.content,
                        {
                            [cls.hidden]: isMobile && isHiddenContent,
                            [cls.contentMobile]: !isHiddenContent && isMobile,
                        },
                        [],
                    )}
                >
                    {content}
                </section>
            </section>
        )
    },
)
