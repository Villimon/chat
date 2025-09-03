import { FC, memo } from 'react'
import { MenuPosition } from '@/entities/Dialog/model/types'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import cls from '../../styles/ContextMenu.module.scss'
import { useMenuLogic } from '../../lib/hooks/useMenuLogic'

interface FolderMenuProps {
    className?: string
    onCloseMenu?: () => void
    menuPosition?: MenuPosition
    isOpenMenu?: boolean
    isMutedDialog?: boolean
    isPinedDialog?: boolean
    dialog?: Dialog
}

export const FolderMenu: FC<FolderMenuProps> = memo(
    ({ onCloseMenu, menuPosition, isOpenMenu }) => {
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
                <div>123</div>
                <div>123</div>
            </div>
        )
    },
)
