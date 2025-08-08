import { FC, memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import { useToggleDialog } from '@/entities/Dialog/api/DialogApi'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'

interface ToggleDialogMuteProps {
    className?: string
    onCloseMenu?: () => void
    isMutedDialog?: boolean
    dialog?: Dialog
}

export const ToggleDialogMute: FC<ToggleDialogMuteProps> = memo(
    ({ onCloseMenu, isMutedDialog, className, dialog }) => {
        const [toggleDialogMute] = useToggleDialog()

        const handleToggleDialogMute = async () => {
            if (!dialog?.id) return

            await toggleDialogMute({
                userSettings: {
                    ...dialog.userSettings,
                    isMuted: !dialog.userSettings.isMuted,
                },
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
