import { FC, memo, useEffect, useRef } from 'react'
import cls from './ContextMenu.module.scss'
import { MenuPosition } from '../../model/types'
import { ToggleDialogMute } from '../../../../features/ToggleDialogMute/ui/ToggleDialogMute'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'

interface ContextMenuProps {
    className?: string
    onCloseMenu?: () => void
    menuPosition?: MenuPosition
    isOpenMenu?: boolean
    isMutedDialog?: boolean
    dialog?: Dialog
}

export const ContextMenu: FC<ContextMenuProps> = memo(
    ({ onCloseMenu, menuPosition, isOpenMenu, isMutedDialog, dialog }) => {
        const menuRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (
                    menuRef.current &&
                    !menuRef.current.contains(e.target as Node)
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
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        onCloseMenu?.()
                    }}
                >
                    Закрепить чат/Открепить чат
                </div>
                <ToggleDialogMute
                    className={cls.menuItem}
                    isMutedDialog={isMutedDialog}
                    onCloseMenu={onCloseMenu}
                    dialog={dialog}
                />
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        onCloseMenu?.()
                    }}
                >
                    Прочитан/Не прочитан
                </div>
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        onCloseMenu?.()
                    }}
                >
                    Добавить в папку
                </div>
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        onCloseMenu?.()
                    }}
                >
                    Удалить чат/Покинуть группу
                </div>
            </div>
        )
    },
)
