import { memo } from 'react'
import { SidebarHeader } from '../../SidebarHeader/ui/SidebarHeader'
import { DialogList } from '../../DialogList/ui/DialogList'
import { Folders } from '../../Folders/ui/Folders'

export const Sidebar = memo(() => {
    return (
        <aside>
            <SidebarHeader />
            <Folders />
            <DialogList />
        </aside>
    )
})
