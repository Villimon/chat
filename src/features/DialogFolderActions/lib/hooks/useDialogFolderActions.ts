import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserData } from '@/entities/User'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import {
    useAddToFolder,
    useRemoveToFolder,
} from '@/entities/Dialog/api/DialogApi'

interface UseDialogFolderActionsProps {
    dialog?: Dialog
    onCloseMenu?: () => void
}

export const useDialogFolderActions = ({
    dialog,
    onCloseMenu,
}: UseDialogFolderActionsProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const [addToFolder] = useAddToFolder()
    const [removeToFolder] = useRemoveToFolder()
    const userData = useSelector(getUserData)

    const handleAddToFolder = useCallback(
        async (value: string) => {
            if (!dialog?.id || !userData?.id || !value) return

            try {
                await addToFolder({
                    userId: userData.id,
                    dialogId: dialog.id,
                    valueFolder: value,
                }).unwrap()
                onCloseMenu?.()
            } catch (e) {
                console.log(e)
            }
        },
        [addToFolder, dialog?.id, userData?.id, onCloseMenu],
    )

    const handleRemoveToFolder = useCallback(
        async (value: string) => {
            if (!dialog?.id || !userData?.id || !value) return

            try {
                await removeToFolder({
                    userId: userData.id,
                    dialogId: dialog.id,
                    valueFolder: value,
                }).unwrap()

                onCloseMenu?.()
            } catch (e) {
                console.log(e)
            }
        },
        [dialog?.id, userData?.id, removeToFolder, onCloseMenu],
    )

    const handleOnClick = useCallback(() => {
        setIsOpen(true)
    }, [])

    const handleOnClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    return {
        isOpen,
        handleAddToFolder,
        handleRemoveToFolder,
        handleOnClick,
        handleOnClose,
    }
}
