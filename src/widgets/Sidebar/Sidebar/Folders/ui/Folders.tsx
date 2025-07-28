import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { FolderType } from '@/entities/User/model/types/userSchema'
import { FoldersTabs } from '@/features/FoldersTabs'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { getUserData } from '@/entities/User'
import { getActiveFolder } from '../../model/selectors/getActiveFolder/getActiveFolder'
import { sidebarActions } from '../../model/slice/sidebar'

export const Folders = () => {
    const userData = useSelector(getUserData)
    const activeFolder = useSelector(getActiveFolder)
    const dispatch = useAppDispatch()

    const onChangeFolder = useCallback(
        (tab: FolderType) => {
            dispatch(sidebarActions.setActiveFolser(tab))
            dispatch(sidebarActions.reset())
        },
        [dispatch],
    )

    if (!userData?.folders?.length) {
        return null
    }

    return (
        <FoldersTabs
            value={activeFolder}
            onChangeFolder={onChangeFolder}
            tabs={userData.folders}
        />
    )
}
