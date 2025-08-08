import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { getUserData, useToggleDialogMuteMutation } from '@/entities/User'
import { cn } from '@/shared/lib/classNames/classNames'

interface ToggleDialogMuteProps {
    dialog?: Dialog
    className?: string
    onCloseMenu?: () => void
    isMutedDialog?: boolean
}

export const ToggleDialogMute: FC<ToggleDialogMuteProps> = memo(
    ({ dialog, onCloseMenu, isMutedDialog, className }) => {
        const userData = useSelector(getUserData)
        const [toggleDialogMute] = useToggleDialogMuteMutation()

        const handleToggleDialogMute = async () => {
            if (!userData?.dialogSettings || !dialog?.id) return

            await toggleDialogMute({
                userId: userData?.id ?? '',
                dialogSettings: userData?.dialogSettings?.map((item) => {
                    if (item.dialogId === dialog?.id) {
                        return {
                            ...item,
                            isMuted: !item.isMuted,
                        }
                    }
                    return item
                }),
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
