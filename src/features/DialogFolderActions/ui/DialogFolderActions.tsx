import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Text } from '@/shared/ui/Text/Text'
import { cn } from '@/shared/lib/classNames/classNames'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { getUserFolders } from '@/entities/User'
import { useDialogFolderActions } from '../lib/hooks/useDialogFolderActions'

interface DialogFolderActionsProps {
    className?: string
    dialog?: Dialog
    onCloseMenu?: () => void
}

export const DialogFolderActions: FC<DialogFolderActionsProps> = memo(
    ({ className, dialog, onCloseMenu }) => {
        const userFolders = useSelector(getUserFolders)
        const userDialogFolder = dialog?.userSettings.folders

        const {
            handleAddToFolder,
            handleOnClick,
            handleOnClose,
            handleRemoveToFolder,
            isOpen,
        } = useDialogFolderActions({ dialog, onCloseMenu })

        return (
            <div className={cn('', {}, [className])}>
                <Button
                    color="error"
                    variant="clear"
                    type="button"
                    className={cn('', {}, [className])}
                    onClick={handleOnClick}
                    fullWidth
                >
                    Добавить в папку
                </Button>
                <Modal isOpen={isOpen} onClose={handleOnClose}>
                    <VStack gap="16">
                        <Text text="Добавить в папку:" />
                        <HStack gap="4">
                            {userFolders?.map((folder) => {
                                const isDialogInFolder = userDialogFolder?.includes(folder.value)

                                return (
                                    <Button
                                        variant="filled"
                                        onClick={() =>
                                            (isDialogInFolder
                                                ? handleRemoveToFolder(
                                                    folder.value,
                                                )
                                                : handleAddToFolder(
                                                    folder.value,
                                                ))}
                                        addonRight={
                                            isDialogInFolder ? '✅' : null
                                        }
                                    >
                                        {folder.title}
                                    </Button>
                                )
                            })}
                        </HStack>
                        {/* TODO: Добавить создани папки */}
                        <Button>Создать новую папку</Button>
                    </VStack>
                </Modal>
            </div>
        )
    },
)
