import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { cn } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { useToggleDialogPin } from '@/entities/Dialog/api/DialogApi'
import { getUserData } from '@/entities/User'
import { getActiveFolder } from '../../../widgets/Sidebar/Sidebar/model/selectors/getActiveFolder/getActiveFolder'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'

interface DialogPinningProps {
    className?: string
    isPined?: boolean
    nextOrder: number
    onCloseMenu?: () => void
    dialog?: Dialog
}

export const DialogPinning: FC<DialogPinningProps> = ({
    className,
    isPined,
    nextOrder,
    onCloseMenu,
    dialog,
}) => {
    const [toggleDialogPin] = useToggleDialogPin()
    const userData = useSelector(getUserData)
    const activeFolder = useSelector(getActiveFolder)

    const handleToggleDialogPin = useCallback(async () => {
        if (!dialog?.id || !userData?.id) return

        try {
            await toggleDialogPin({
                userId: userData.id,
                dialogId: dialog.id,
                valueFolder: activeFolder.value,
                nextOrder,
                pinned: !isPined,
            }).unwrap()
        } catch (e) {
            console.log(e)
            // TODO: Добавить везде вот такой код, используется библиотека, можно посмотреть какая в курсе по танстеку
            // .showError('Не удалось изменить закрепление')
        }
    }, [
        dialog?.id,
        userData?.id,
        toggleDialogPin,
        activeFolder.value,
        nextOrder,
        isPined,
    ])

    const handleClick = useCallback(() => {
        handleToggleDialogPin()
        onCloseMenu?.()
    }, [onCloseMenu, handleToggleDialogPin])

    return (
        <div className={cn('', {}, [className])}>
            <Button variant="clear" onClick={handleClick} fullWidth>
                {isPined ? 'Открепить чат' : 'Закрепить чат'}
            </Button>
        </div>
    )
}
