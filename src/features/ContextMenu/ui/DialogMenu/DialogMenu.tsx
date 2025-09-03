import { FC, memo } from 'react'
import { MenuPosition } from '@/entities/Dialog/model/types'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { DialogActions } from '../../../DialogActions/ui/DialogActions/DialogActions'
import { DialogCounterControl } from '../../../DialogCounterControl/ui/DialogCounterControl'
import { DialogFolderActions } from '../../../DialogFolderActions/ui/DialogFolderActions'
import { DialogPinning } from '../../../DialogPinning/ui/DialogPinning'
import { ToggleDialogMute } from '../../../ToggleDialogMute/ui/ToggleDialogMute'
import cls from '../../styles/ContextMenu.module.scss'
import { useMenuLogic } from '../../lib/hooks/useMenuLogic'

interface DialogMenuProps {
    className?: string
    onCloseMenu?: () => void
    menuPosition?: MenuPosition
    isOpenMenu?: boolean
    isMutedDialog?: boolean
    isPinedDialog?: boolean
    dialog?: Dialog
    nextOrder: number
}

export const DialogMenu: FC<DialogMenuProps> = memo(
    ({
        onCloseMenu,
        menuPosition,
        isOpenMenu,
        isMutedDialog,
        dialog,
        isPinedDialog,
        nextOrder,
    }) => {
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
                <DialogPinning
                    isPined={isPinedDialog}
                    nextOrder={nextOrder}
                    className={cls.menuItem}
                    onCloseMenu={onCloseMenu}
                    dialog={dialog}
                />
                <ToggleDialogMute
                    className={cls.menuItem}
                    isMutedDialog={isMutedDialog}
                    onCloseMenu={onCloseMenu}
                    dialog={dialog}
                />
                <DialogCounterControl
                    className={cls.menuItem}
                    onCloseMenu={onCloseMenu}
                    dialog={dialog}
                />
                <DialogFolderActions
                    className={cls.menuItem}
                    dialog={dialog}
                    onCloseMenu={onCloseMenu}
                />
                <DialogActions
                    className={cls.menuItem}
                    dialog={dialog}
                    onCloseMenu={onCloseMenu}
                />
            </div>
        )
    },
)
