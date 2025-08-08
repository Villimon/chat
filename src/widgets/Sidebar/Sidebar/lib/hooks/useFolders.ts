import { useSelector } from 'react-redux'
import { useEffect, useMemo, useRef } from 'react'
import { getUserData } from '@/entities/User'
import { dialogApi } from '@/entities/Dialog'
import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'

export const useFolders = () => {
    const userData = useSelector(getUserData)

    const { data: allCachedData } = useSelector(
        dialogApi.endpoints.getDialog.select({
            userId: userData?.id ?? '',
            folder: 'all',
            query: '',
            limit: 20,
        }),
    )

    //! TODO:Могут быть проблемы из-за этого
    const dialogs = useRef<DialogDto | undefined>(undefined)
    const folders = userData?.folders

    useEffect(() => {
        if (allCachedData) {
            dialogs!.current = allCachedData
        }
    }, [allCachedData])

    const foldersWithUnreadCount = useMemo(() => {
        return folders?.map((folder) => {
            const dialogsWithOurFolders = dialogs?.current?.data.filter(
                (dialog) => {
                    return dialog.userSettings.folders.includes(folder.value)
                },
            )

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogs.current, folders])

    const allUnreadMessages = useMemo(() => {
        return dialogs?.current?.data
            ?.map((item) => item.userSettings.unreadCount)
            .reduce((acc, sum) => acc + sum, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogs.current])

    return {
        foldersWithUnreadCount,
        allUnreadMessages,
    }
}
