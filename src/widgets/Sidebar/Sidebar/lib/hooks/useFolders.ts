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

    const lastValidData = useRef<DialogDto | undefined>(undefined)
    useEffect(() => {
        if (allCachedData) {
            lastValidData.current = allCachedData
        }
    }, [allCachedData])

    const rawFolders = userData?.folders
    const folders = rawFolders
        ? [...rawFolders].sort((a, b) => a.order! - b.order!)
        : undefined

    const foldersWithUnreadCount = useMemo(() => {
        const dataToUse = allCachedData || lastValidData.current
        if (!folders || !dataToUse?.data) {
            return folders
        }

        return folders?.map((folder) => {
            const dialogsWithOurFolders = dataToUse.data.filter((dialog) => {
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
    }, [allCachedData, folders])

    const allUnreadMessages = useMemo(() => {
        const dataToUse = allCachedData || lastValidData.current
        if (!dataToUse?.data) return 0
        return dataToUse.data
            ?.map((item) => item.userSettings.unreadCount)
            .reduce((acc, sum) => acc + sum, 0)
    }, [allCachedData])

    return {
        foldersWithUnreadCount,
        allUnreadMessages,
    }
}
