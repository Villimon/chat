import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { cn } from '@/shared/lib/classNames/classNames'
import { useToggleDialog } from '@/entities/Dialog/api/DialogApi'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { getUserData } from '@/entities/User'

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

        const handleToggleDialogMute = async () => {
            if (!dialog?.id || !userData?.id) return

            await toggleDialogMute({
                userId: userData.id,
                dialogId: dialog.id,
            }).unwrap()
        }

        return (
            <div
                className={cn('', {}, [className])}
                onClick={() => {
                    handleToggleDialogMute()
                    onCloseMenu?.()
                }}
            >
                {isMutedDialog
                    ? 'Включить уведомления'
                    : 'Выключить уведомления'}
            </div>
        )
    },
)
