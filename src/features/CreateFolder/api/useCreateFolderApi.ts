import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getUserData, useCreateNewFolder } from '@/entities/User'
import { initAuthData } from '@/entities/User/model/services/initAuthData'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '

interface UseCreateFolderApiParams {
    onClose: () => void
    onCloseMenu?: () => void
}

export const useCreateFolderApi = ({
    onClose,
    onCloseMenu,
}: UseCreateFolderApiParams) => {
    const userData = useSelector(getUserData)
    const [createFolder, { isError, isLoading }] = useCreateNewFolder()
    const dispatch = useAppDispatch()

    const handlerCreateFolder = useCallback(
        async (values: { folderName: string }) => {
            const { folderName } = values
            try {
                await createFolder({
                    folderName,
                    userId: userData?.id ?? '',
                }).unwrap()
                onClose()
                dispatch(initAuthData())
                onCloseMenu?.()
            } catch (error) {
                console.log(error)
            }
        },
        [createFolder, userData, onClose, dispatch, onCloseMenu],
    )

    return { isError, isLoading, handlerCreateFolder }
}
