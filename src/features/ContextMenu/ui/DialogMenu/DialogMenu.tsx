import { FC, memo, useRef, useEffect } from 'react'
import { MenuPosition } from '@/entities/Dialog/model/types'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { DialogActions } from '../../../DialogActions/ui/DialogActions/DialogActions'
import { DialogCounterControl } from '../../../DialogCounterControl/ui/DialogCounterControl'
import { DialogFolderActions } from '../../../DialogFolderActions/ui/DialogFolderActions'
import { DialogPinning } from '../../../DialogPinning/ui/DialogPinning'
import { ToggleDialogMute } from '../../../ToggleDialogMute/ui/ToggleDialogMute'
import cls from './DialogMenu.module.scss'

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
        const menuRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                const target = e.target as Element
                const isClickOnModal = target.closest('#modal') !== null

                if (
                    menuRef.current
                    && !menuRef.current.contains(target)
                    && !isClickOnModal
                ) {
                    onCloseMenu?.()
                }
            }

            if (isOpenMenu) {
                document.addEventListener('click', handleClickOutside)
                return () => {
                    document.removeEventListener('click', handleClickOutside)
                }
            }

            return undefined
        }, [isOpenMenu, onCloseMenu])

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
