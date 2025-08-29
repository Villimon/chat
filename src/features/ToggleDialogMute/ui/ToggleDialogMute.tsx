import { FC, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { cn } from '@/shared/lib/classNames/classNames'
import { useToggleDialog } from '@/entities/Dialog/api/DialogApi'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { getUserData } from '@/entities/User'
import { Button } from '@/shared/ui/Button'
import { getActiveFolder } from '../../../widgets/Sidebar/Sidebar/model/selectors/getActiveFolder/getActiveFolder'

interface ToggleDialogMuteProps {
    className?: string
    onCloseMenu?: () => void
    isMutedDialog?: boolean
    dialog?: Dialog
}

export const ToggleDialogMute: FC<ToggleDialogMuteProps> = memo(
    ({ onCloseMenu, isMutedDialog, className, dialog }) => {
        const [toggleDialogMute] = useToggleDialog()
        const userData = useSelector(getUserData)
        const activeFolder = useSelector(getActiveFolder)

        const handleToggleDialogMute = useCallback(async () => {
            if (!dialog?.id || !userData?.id) return

            try {
                await toggleDialogMute({
                    userId: userData.id,
                    dialogId: dialog.id,
                    folder: activeFolder.value,
                }).unwrap()
            } catch (e) {
                console.log(e)
            }
        }, [dialog?.id, toggleDialogMute, userData?.id, activeFolder])

        const handleClick = useCallback(() => {
            handleToggleDialogMute()
            onCloseMenu?.()
        }, [handleToggleDialogMute, onCloseMenu])

        return (
            <div className={cn('', {}, [className])}>
                <Button variant="clear" onClick={handleClick} fullWidth>
                    {isMutedDialog
                        ? 'Включить уведомления'
                        : 'Выключить уведомления'}
                </Button>
            </div>
        )
    },
)
