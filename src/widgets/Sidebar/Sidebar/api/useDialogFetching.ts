import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useGetDialog } from '@/entities/Dialog'
import { getUserData } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { getActiveFolder } from '../model/selectors/getActiveFolder/getActiveFolder'
import { getLimit } from '../model/selectors/getLimit/getLimit'
import { getPage } from '../model/selectors/getPage/getPage'
import { getSearchQuery } from '../model/selectors/getSearchQuery/getSearchQuery'
import { sidebarActions } from '../model/slice/sidebar'
import { FolderType } from '@/entities/User/model/types/userSchema'
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce'

export const useDialogFetching = () => {
    const userData = useSelector(getUserData)
    const activeFolder = useSelector(getActiveFolder)
    const searchQuery = useSelector(getSearchQuery)
    const page = useSelector(getPage)
    const limit = useSelector(getLimit)
    const dispatch = useAppDispatch()

    const debouncedSearch = useDebounce(searchQuery, 500)

    const { refetch, currentData, ...queryResult } = useGetDialog({
        userId: userData?.id ?? '',
        page,
        limit,
        folder: activeFolder.value,
        query: debouncedSearch,
    })

    const handleFolderChange = useCallback(
        (tab: FolderType) => {
            dispatch(sidebarActions.setActiveFolder(tab))
            dispatch(sidebarActions.reset())
            if (!currentData) {
                refetch()
            }
        },
        [currentData, refetch, dispatch],
    )

    const handleSearch = useCallback(
        (value: string) => {
            dispatch(sidebarActions.setSearchQuery(value))
            dispatch(sidebarActions.reset())
        },
        [dispatch],
    )

    return {
        ...queryResult,
        handleSearch,
        handleFolderChange,
        activeFolder,
        searchQuery,
    }
}
