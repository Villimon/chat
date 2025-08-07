import { FoldersTabs } from '@/features/FoldersTabs'
import { useFolders } from '../../../lib/hooks/useFolders'
import { useDialogFetching } from '../../../api/useDialogFetching'

export const Folders = () => {
    const { handleFolderChange, activeFolder } = useDialogFetching()

    const { allUnreadMessages, foldersWithUnreadCount } = useFolders()

    if (!foldersWithUnreadCount?.length) {
        return null
    }

    return (
        <FoldersTabs
            value={activeFolder}
            onChangeFolder={handleFolderChange}
            tabs={foldersWithUnreadCount}
            allUnreadMessages={allUnreadMessages}
        />
    )
}
