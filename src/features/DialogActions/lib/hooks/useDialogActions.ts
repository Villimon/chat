import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { getUserData } from '@/entities/User'
import {
    useDeleteDialog,
    useLeaveDialog,
} from '@/entities/Dialog/api/DialogApi'

interface UseDialogActionsParams {
    dialog?: Dialog
    onCloseMenu?: () => void
}

export const useDialogActions = ({
    dialog,
    onCloseMenu,
}: UseDialogActionsParams) => {
    const [modalShow, setModalShow] = useState(false)

    const userData = useSelector(getUserData)
    const isGroup = dialog?.type === 'group'
    const isPrivate = dialog?.type === 'private'

    const [leaveDialog] = useLeaveDialog()
    const [deleteDialog] = useDeleteDialog()

    const handleOpenModal = useCallback(() => {
        setModalShow(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setModalShow(false)
    }, [])

    const handleLeaveDialogClick = useCallback(async () => {
        if (dialog?.id && userData?.id) {
            await leaveDialog({
                dialogId: dialog?.id,
                userId: userData.id,
            }).unwrap()

            onCloseMenu?.()
        }
    }, [dialog?.id, leaveDialog, userData?.id, onCloseMenu])

    const handleDeleteDialogClick = useCallback(async () => {
        if (dialog?.id) {
            await deleteDialog({ dialogId: dialog?.id }).unwrap()

            onCloseMenu?.()
        }
    }, [dialog?.id, deleteDialog, onCloseMenu])

    return {
        modalShow,
        isGroup,
        isPrivate,
        handleOpenModal,
        handleCloseModal,
        handleLeaveDialogClick,
        handleDeleteDialogClick,
    }
}
