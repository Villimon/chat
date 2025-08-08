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
    const dialogs = allCachedData?.data
    const folders = userData?.folders

    const foldersWithUnreadCount = useMemo(() => {
        return folders?.map((folder) => {
            const dialogsWithOurFolders = dialogs?.filter((dialog) => {
                return dialog.userSettings.folders.includes(folder.value)
            })

            if (dialogsWithOurFolders) {
                return {
                    ...folder,
                    unreadCount: dialogsWithOurFolders
                        .map((item) => item.userSettings.unreadCount)
                        .reduce((acc, sum) => acc + sum, 0),
                }
            }
            return folder
        })
    }, [dialogs, folders])

    const allUnreadMessages = useMemo(() => {
        return dialogs
            ?.map((item) => item.userSettings.unreadCount)
            .reduce((acc, sum) => acc + sum, 0)
    }, [dialogs])

    return {
        foldersWithUnreadCount,
        allUnreadMessages,
    }
}
