import { FC, memo, useEffect, useRef } from 'react'
import cls from './ContextMenu.module.scss'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { MenuPosition } from '../../model/types'

interface ContextMenuProps {
    dialog?: Dialog
    className?: string
    onCloseMenu?: () => void
    menuPosition?: MenuPosition
    isOpenMenu?: boolean
}

export const ContextMenu: FC<ContextMenuProps> = memo(
    ({ dialog, onCloseMenu, menuPosition, isOpenMenu }) => {
        const menuRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (
                    menuRef.current
                    && !menuRef.current.contains(e.target as Node)
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
                        console.log('Action 1 clicked for dialog', dialog?.id)
                        onCloseMenu?.()
                    }}
                >
                    Закрепить чат/Открепить чат
                </div>
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        console.log('Action 2 clicked for dialog', dialog?.id)
                        onCloseMenu?.()
                    }}
                >
                    Выключить уведомления/Включить уведомления
                </div>
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        console.log('Delete clicked for dialog', dialog?.id)
                        onCloseMenu?.()
                    }}
                >
                    Прочитан/Не прочитан
                </div>
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        console.log('Delete clicked for dialog', dialog?.id)
                        onCloseMenu?.()
                    }}
                >
                    Добавить в папку
                </div>
                <div
                    className={cls.menuItem}
                    onClick={() => {
                        console.log('Delete clicked for dialog', dialog?.id)
                        onCloseMenu?.()
                    }}
                >
                    Удалить чат/Покинуть группу
                </div>
            </div>
        )
    },
)
