import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { FolderType } from '@/entities/User/model/types/userSchema'
import { initAuthData } from '@/entities/User/model/services/initAuthData'
import {
    getUserData,
    getUserFolders,
    useDeleteFolder,
    useReorderFolders,
} from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '

export const useFoldersManagement = () => {
    const userData = useSelector(getUserData)
    const rawFolders = useSelector(getUserFolders)
    const dispatch = useAppDispatch()

    const [currentFolder, setCurrentFolder] = useState<FolderType | undefined>()
    const [reorderFolders] = useReorderFolders()
    const [deleteFolder] = useDeleteFolder()

    const folders = useMemo(() => {
        if (!rawFolders) return undefined
        return [...rawFolders].sort((a, b) => (a.order || 0) - (b.order || 0))
    }, [rawFolders])

    // Обработчик начала перетаскивания
    const handleDragStart = useCallback(
        (e: React.DragEvent, folder: FolderType) => {
            setCurrentFolder(folder)
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setData('text/html', e.target as unknown as string)
        },
        [],
    )

    // Обработчик наведения при перетаскивании
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        const target = e.currentTarget as HTMLElement
        target.style.borderColor = 'var(--text-secondary)'
        target.style.background = 'var(--light-bg)'
    }, [])

    // Обработчик ухода курсора при перетаскивании
    const handleDragLeave = useCallback((e: React.DragEvent) => {
        const target = e.currentTarget as HTMLElement
        target.style.borderColor = 'var(--hint-primary)'
        target.style.background = 'transparent'
    }, [])

    // Обработчик сброса элемента
    const handleDrop = useCallback(
        async (e: React.DragEvent, targetFolder: FolderType) => {
            e.preventDefault()
            const target = e.currentTarget as HTMLElement
            target.style.borderColor = 'var(--hint-primary)'
            target.style.background = 'transparent'

            if (
                !currentFolder
                || !folders
                || currentFolder.value === targetFolder.value
            ) {
                return
            }

            // Создаем новый порядок папок
            const newOrderFolders = folders.map((item) => {
                if (item.value === targetFolder.value) {
                    return { ...item, order: currentFolder.order }
                }
                if (item.value === currentFolder.value) {
                    return { ...item, order: targetFolder.order }
                }
                return item
            })

            try {
                await reorderFolders({
                    folders: newOrderFolders,
                    userId: userData?.id ?? '',
                }).unwrap()

                // Обновляем данные авторизации после успешного изменения порядка
                dispatch(initAuthData())
            } catch (error) {
                console.error('Ошибка при изменении порядка папок:', error)
            }
        },
        [currentFolder, folders, reorderFolders, userData?.id, dispatch],
    )

    const handleDeleteFolder = useCallback(
        async (value: string) => {
            try {
                await deleteFolder({
                    folderValue: value,
                    userId: userData?.id ?? '',
                }).unwrap()

                dispatch(initAuthData())
            } catch (error) {
                console.error('Ошибка при удаление папки:', error)
            }
        },
        [deleteFolder, dispatch, userData?.id],
    )

    return {
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDeleteFolder,
        folders,
    }
}
