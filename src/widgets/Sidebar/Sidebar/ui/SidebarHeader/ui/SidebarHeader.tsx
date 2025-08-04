import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import cls from './SidebarHeader.module.scss'
import { SidebarMenu } from './SidebarMenu'
import { useDialogFetching } from '../../../api/useDialogFetching'

export const SidebarHeader = memo(() => {
    const { handleSearch, searchQuery } = useDialogFetching()

    return (
        <div className={cls.container}>
            <SidebarMenu />
            <Input
                placeholder="Поиск"
                onChange={handleSearch}
                value={searchQuery}
            />
        </div>
    )
})
