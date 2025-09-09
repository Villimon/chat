import { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { TabItem } from '@/shared/ui/Tabs/Tabs'
import { Button } from '@/shared/ui/Button'
import { initAuthData } from '@/entities/User/model/services/initAuthData'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { getUserData, useEditFolder } from '@/entities/User'
import { cn } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal/Modal'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Input } from '@/shared/ui/Input/Input'
import { Text } from '@/shared/ui/Text/Text'

interface EditFolderProps {
    className?: string
    onCloseMenu?: () => void
    tab: TabItem
}

export interface EditFolderFormData {
    newTitle: string
}

export const EditFolder: FC<EditFolderProps> = ({
    tab,
    className,
    onCloseMenu,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [editFolder, { isError }] = useEditFolder()
    const userData = useSelector(getUserData)
    const dispatch = useAppDispatch()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            newTitle,
        },
        mode: 'onChange',
    })

    const handleClick = useCallback(() => {
        setIsOpen(true)
    }, [setIsOpen])

    const onClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    const handleOnChange = useCallback((value: string) => {
        setNewTitle(value)
    }, [])

    const handleFormSubmit = useCallback(
        async (data: EditFolderFormData) => {
            if (!tab || !userData?.id) return

            try {
                await editFolder({
                    userId: userData?.id,
                    folderValue: tab.value,
                    newTitle: data.newTitle,
                }).unwrap()
                dispatch(initAuthData())
                onCloseMenu?.()
            } catch (error) {
                console.error('Form submission error:', error)
            }
        },
        [tab, userData?.id, editFolder, dispatch, onCloseMenu],
    )

    return (
        <div className={cn('', {}, [className])}>
            <Button variant="clear" onClick={handleClick} fullWidth>
                Редактировать
            </Button>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <form
                        style={{ width: '100%' }}
                        onSubmit={handleSubmit(handleFormSubmit)}
                    >
                        <VStack gap="16">
                            <Controller
                                name="newTitle"
                                control={control}
                                defaultValue=""
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
                                        label="Новое название"
                                        autoFocus
                                        placeholder="Новое название"
                                        error={errors.newTitle?.message}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                            <VStack gap="8" max>
                                <Button
                                    onClick={handleSubmit(handleFormSubmit)}
                                    fullWidth
                                    type="submit"
                                >
                                    Редактировать папку
                                </Button>
                                <Button onClick={onClose} fullWidth>
                                    Закрыть
                                </Button>
                            </VStack>
                            {isError && (
                                <VStack>
                                    <Text
                                        variant="error"
                                        text={errors.newTitle?.message}
                                    />
                                </VStack>
                            )}
                        </VStack>
                    </form>
                </Modal>
            )}
        </div>
    )
}
