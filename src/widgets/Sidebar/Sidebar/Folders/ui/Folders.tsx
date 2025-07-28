import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { FolderType } from '@/entities/User/model/types/userSchema'
import { FoldersTabs } from '@/features/FoldersTabs'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { foldersActions } from '../model/slice/FoldersSlice'
import { getActiveFolder } from '../model/selectors/getActiveFolder/getActiveFolder'
import { getUserData } from '@/entities/User'
import { dialogListActions } from '../../DialogList/model/slice/DialogList'

export const Folders = () => {
    const userData = useSelector(getUserData)
    const activeFolder = useSelector(getActiveFolder)
    const dispatch = useAppDispatch()

    const onChangeFolder = useCallback(
        (tab: FolderType) => {
            dispatch(foldersActions.setActiveFolser(tab))
            dispatch(dialogListActions.reset())
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
