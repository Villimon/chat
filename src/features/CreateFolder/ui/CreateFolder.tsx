import { FC, memo } from 'react'
import { Controller } from 'react-hook-form'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Input } from '@/shared/ui/Input/Input'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Button } from '@/shared/ui/Button'
import { Text } from '@/shared/ui/Text/Text'
import { useCreateFolderApi } from '../api/useCreateFolderApi'
import { useCreateFolderForm } from '../lib/useCreateFolderForm'

interface CreateFolderProps {
    isOpen: boolean
    onClose: () => void
    onCloseMenu?: () => void
}

export const CreateFolder: FC<CreateFolderProps> = memo(
    ({ isOpen, onClose, onCloseMenu }) => {
        const { handlerCreateFolder, isError, isLoading } = useCreateFolderApi({
            onClose,
            onCloseMenu,
        })

        const {
            control,
            errors,
            handleCancelClick,
            handleOnChange,
            handleSubmit,
        } = useCreateFolderForm({
            onClose,
            onSubmit: (folderName: string) =>
                handlerCreateFolder({ folderName }),
            onCloseMenu,
        })

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <VStack gap="16">
                        <Controller
                            name="folderName"
                            control={control}
                            defaultValue=""
                            disabled={isLoading}
                            rules={{
                                required: 'Это поле обязательно',
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    onChange={(value) => {
                                        field.onChange(value)
                                        handleOnChange(value)
                                    }}
                                    label="Название папки"
                                    autoFocus
                                    placeholder="Название папки"
                                    error={errors.folderName?.message}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        <VStack gap="8" max>
                            <Button
                                disabled={isLoading}
                                onClick={handleSubmit}
                                fullWidth
                                type="submit"
                            >
                                Создать папку
                            </Button>
                            <Button
                                disabled={isLoading}
                                onClick={handleCancelClick}
                                fullWidth
                            >
                                Закрыть
                            </Button>
                        </VStack>
                        {isError && (
                            <VStack>
                                <Text
                                    variant="error"
                                    text={errors.folderName?.message}
                                />
                            </VStack>
                        )}
                    </VStack>
                </form>
            </Modal>
        )
    },
)
