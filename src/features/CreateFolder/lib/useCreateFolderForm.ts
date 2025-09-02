import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

interface UseCreateFolderFormProps {
    onSubmit: (folderName: string) => Promise<void>
    onClose: () => void
    onCloseMenu?: () => void
}

export interface CreateFolderFormData {
    folderName: string
}

export const useCreateFolderForm = ({
    onSubmit,
    onClose,
    onCloseMenu,
}: UseCreateFolderFormProps) => {
    const [folderName, setFolderName] = useState('')

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            folderName,
        },
        mode: 'onChange',
    })

    const handleFormSubmit = useCallback(
        async (data: CreateFolderFormData) => {
            try {
                await onSubmit(data.folderName)
                onClose()
                onCloseMenu?.()
            } catch (error) {
                console.error('Form submission error:', error)
            }
        },
        [onSubmit, onClose, onCloseMenu],
    )

    const handleOnChange = useCallback((value: string) => {
        setFolderName(value)
    }, [])

    const handleCancelClick = useCallback(() => {
        onClose()
    }, [onClose])

    return {
        control,
        errors,
        handleSubmit: handleSubmit(handleFormSubmit),
        handleCancelClick,
        handleOnChange,
    }
}
