import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { cn } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { TabItem } from '@/shared/ui/Tabs/Tabs'
import { getUserData, useDeleteFolder } from '@/entities/User'
import { initAuthData } from '@/entities/User/model/services/initAuthData'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { sidebarActions } from '../../../widgets/Sidebar/Sidebar/model/slice/sidebar'

interface RemoveFolderProps {
    className?: string
    onCloseMenu?: () => void
    tab: TabItem
}

export const RemoveFolder: FC<RemoveFolderProps> = ({
    className,
    onCloseMenu,
    tab,
}) => {
    const [deleteFolder] = useDeleteFolder()
    const userData = useSelector(getUserData)
    const dispatch = useAppDispatch()

    const handleDeleteFolder = useCallback(async () => {
        if (!tab || !userData?.id) return

        try {
            await deleteFolder({
                userId: userData.id,
                folderValue: tab.value,
            }).unwrap()
            dispatch(initAuthData()).then(() => {
                dispatch(
                    sidebarActions.setActiveFolder({
                        title: 'Все',
                        value: 'all',
                    }),
                )
            })
        } catch (e) {
            console.log(e)
        }
    }, [deleteFolder, dispatch, tab, userData?.id])

    const handleClick = useCallback(() => {
        handleDeleteFolder()
        onCloseMenu?.()
    }, [onCloseMenu, handleDeleteFolder])

    return (
        <div className={cn('', {}, [className])}>
            <Button variant="clear" onClick={handleClick} fullWidth>
                Удалить
            </Button>
        </div>
    )
}
