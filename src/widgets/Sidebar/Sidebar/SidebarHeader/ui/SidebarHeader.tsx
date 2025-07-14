import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import cls from './SidebarHeader.module.scss'
import { SidebarMenu } from './SidebarMenu'

export const SidebarHeader = memo(() => {
    return (
        <div className={cls.container}>
            <SidebarMenu />
            <Input placeholder="Поиск" />
        </div>
    )
})
