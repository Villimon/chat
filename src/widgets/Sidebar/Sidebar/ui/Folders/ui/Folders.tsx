import { useSelector } from 'react-redux'
import { FoldersTabs } from '@/features/FoldersTabs'
import { useDialogFetching } from '../../../api/useDialogFetching'
import { getUserData } from '@/entities/User'

export const Folders = () => {
    const userData = useSelector(getUserData)
    const { handleFolderChange, activeFolder } = useDialogFetching()

    if (!userData?.folders?.length) {
        return null
    }

    return (
        <FoldersTabs
            value={activeFolder}
            onChangeFolder={handleFolderChange}
            tabs={userData.folders}
        />
    )
}
