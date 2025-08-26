import { FC, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { cn } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { getUserData } from '@/entities/User'
import { useUpdateReadStatus } from '@/entities/Dialog/api/DialogApi'
import { getActiveFolder } from '../../../widgets/Sidebar/Sidebar/model/selectors/getActiveFolder/getActiveFolder'

interface DialogCounterControlProps {
    className?: string
    onCloseMenu?: () => void
    dialog?: Dialog
}

// TODO: со всех actions контектсного меню, где будет одинаковая логика вынести
export const DialogCounterControl: FC<DialogCounterControlProps> = memo(
    ({ dialog, className, onCloseMenu }) => {
        const isUnreadMessages = Boolean(dialog?.userSettings.unreadCount)
        const userData = useSelector(getUserData)
        const activeFolder = useSelector(getActiveFolder)

        const [updateReadStatus] = useUpdateReadStatus()

        const handleCounterControl = useCallback(async () => {
            if (!dialog?.id || !userData?.id) return

            await updateReadStatus({
                userId: userData.id,
                dialogId: dialog.id,
                folder: activeFolder.value,
            }).unwrap()
        }, [dialog?.id, userData?.id, updateReadStatus, activeFolder])

        const handleClick = useCallback(() => {
            handleCounterControl()
            onCloseMenu?.()
        }, [handleCounterControl, onCloseMenu])

        return (
            <div className={cn('', {}, [className])}>
                <Button variant="clear" onClick={handleClick} fullWidth>
                    {isUnreadMessages ? 'Прочитан' : 'Не прочитан'}
                </Button>
            </div>
        )
    },
)
