import { FC, memo } from 'react'
import { MenuPosition } from '@/entities/Dialog/model/types'
import cls from '../../styles/ContextMenu.module.scss'
import { useMenuLogic } from '../../lib/hooks/useMenuLogic'
import { RemoveFolder } from '../../../RemoveFolder/ui/RemoveFolder'
import { TabItem } from '@/shared/ui/Tabs/Tabs'
import { EditFolder } from '../../../EditFolder/ui/EditFolder'

interface FolderMenuProps {
    className?: string
    onCloseMenu?: () => void
    menuPosition?: MenuPosition
    isOpenMenu?: boolean
    tab: TabItem
}

export const FolderMenu: FC<FolderMenuProps> = memo(
    ({ onCloseMenu, menuPosition, isOpenMenu, tab }) => {
        const menuRef = useMenuLogic(isOpenMenu, onCloseMenu)

        return (
            <div
                ref={menuRef}
                className={cls.contextMenu}
                style={{
                    position: 'fixed',
                    left: menuPosition?.x,
                    top: menuPosition?.y,
                    zIndex: 1000,
                }}
            >
                <EditFolder
                    className={cls.menuItem}
                    onCloseMenu={onCloseMenu}
                    tab={tab}
                />
                <RemoveFolder
                    className={cls.menuItem}
                    onCloseMenu={onCloseMenu}
                    tab={tab}
                />
            </div>
        )
    },
)
