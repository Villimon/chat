import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { getUserData } from '@/entities/User'
import { dialiogApi } from '@/entities/Dialog'

export const useFolders = () => {
    const userData = useSelector(getUserData)

    const { data: allCachedData } = useSelector(
        dialiogApi.endpoints.getDialog.select({
            userId: userData?.id ?? '',
            folder: 'all',
            query: '',
            limit: 20,
        }),
    )
    const dialogSettings = userData?.dialogSettings
    const dialogs = allCachedData?.data
    const folders = userData?.folders

    // Костыль из-за неправильной структуры базы
    const dialogsWithFolders = useMemo(
        () =>
            dialogs?.map((dialog) => {
                const dialogByGroup = dialogSettings?.find(
                    (item) => item.dialogId === dialog.id,
                )
                if (dialogByGroup) {
                    return {
                        ...dialog,
                        folders: dialogByGroup.folders,
                    }
                }
                return dialog
            }),
        [dialogs, dialogSettings],
    )

    const foldersWithUnreadCount = useMemo(
        () =>
            folders?.map((folder) => {
                const dialogsWithOurFolders = dialogsWithFolders?.filter(
                    (item) =>
                        // @ts-ignore
                        item.folders?.includes(folder.value),
                )
                if (dialogsWithOurFolders) {
                    return {
                        ...folder,
                        unreadCount: dialogsWithOurFolders
                            .map((item) => item.unreadCount)
                            .reduce((acc, sum) => acc + sum, 0),
                    }
                }
                return folder
            }),
        [dialogsWithFolders, folders],
    )

    const allUnreadMessages = useMemo(() => {
        return dialogs
            ?.map((item) => item.unreadCount)
            .reduce((acc, sum) => acc + sum, 0)
    }, [dialogs])

    return {
        foldersWithUnreadCount,
        allUnreadMessages,
    }
}
