import { FC, memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './DialogActions.module.scss'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { LeaveButton } from '../LeaveButton/LeaveButton'
import { DeleteModal } from '../DeleteModal/DeleteModal'

import { useDialogActions } from '../../lib/hooks/useDialogActions'

interface DialogActionsProps {
    className?: string
    dialog?: Dialog
    onCloseMenu?: () => void
}

export const DialogActions: FC<DialogActionsProps> = memo(
    ({ className, dialog, onCloseMenu }) => {
        const {
            handleCloseModal,
            handleDeleteDialogClick,
            handleLeaveDialogClick,
            handleOpenModal,
            isGroup,
            isPrivate,
            modalShow,
        } = useDialogActions({ dialog, onCloseMenu })

        return (
            <div className={cn(cls.DialogActions, {}, [className])}>
                {isGroup && (
                    <LeaveButton
                        className={cls.button}
                        onClick={handleLeaveDialogClick}
                    />
                )}
                {isPrivate && (
                    <DeleteModal
                        isOpen={modalShow}
                        className={cls.button}
                        onClick={handleOpenModal}
                        onClose={handleCloseModal}
                        leaveDialog={handleLeaveDialogClick}
                        deleteDialog={handleDeleteDialogClick}
                    />
                )}
            </div>
        )
    },
)
