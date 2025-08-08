import { FoldersTabs } from '@/features/FoldersTabs'
import { useDialogFetching } from '../../../api/useDialogFetching'
import { useFolders } from '../../../lib/hooks/useFolders'

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
