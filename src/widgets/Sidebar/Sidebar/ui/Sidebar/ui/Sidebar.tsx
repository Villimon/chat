import { memo } from 'react'
import { SidebarHeader } from '../../SidebarHeader/ui/SidebarHeader'
import { DialogList } from '../../DialogList/ui/DialogList'
import { Folders } from '../../Folders/ui/Folders'
import { useAppearance } from '@/shared/hooks/useAppearance/useAppearance'
import { FolderType } from '@/shared/constants/theme'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'

export const Sidebar = memo(() => {
    const { folderType } = useAppearance()
    const isDefaultFolderType = folderType === FolderType.PANEL_TOP

    return (
        <aside>
            <SidebarHeader />
            {!isDefaultFolderType ? (
                <HStack align="start" max gap="8">
                    <Folders />
                    <DialogList />
                </HStack>
            ) : (
                <>
                    <Folders />
                    <DialogList />
                </>
            )}
        </aside>
    )
})
