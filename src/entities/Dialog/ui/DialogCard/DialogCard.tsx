import { FC, memo, useMemo } from 'react'
import { format, isThisWeek, isToday, setDefaultOptions } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Text } from '@/shared/ui/Text/Text'
import cls from './DialogCard.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'
import { Dialog } from '../../model/types/dialogSchema'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { MenuPosition } from '../../model/types'
import { ContextMenu } from '../ContextMenuByDialogCard/ContextMenu'

interface DialogCardProps {
    dialog: Dialog
    className?: string
    onCloseMenu?: () => void
    onContextMenu?: (e: React.MouseEvent) => void
    isOpenMenu?: boolean
    menuPosition?: MenuPosition
}

setDefaultOptions({ locale: ru })

const formatDate = (date: string) => {
    if (isToday(date)) {
        return format(date, 'HH:mm')
    }

    if (isThisWeek(date)) {
        return format(date, 'EE')
    }

    return format(date, 'dd.MM')
}

export const DialogCard: FC<DialogCardProps> = memo(
    ({
        dialog,
        className,
        isOpenMenu,
        onCloseMenu,
        onContextMenu,
        menuPosition,
    }) => {
        const fullName = dialog.interlocutor?.firstName && dialog.interlocutor?.lastName
            ? `${dialog.interlocutor?.firstName} ${dialog.interlocutor?.lastName}`
            : undefined

        const isMutedDialog = useMemo(() => {
            return dialog.userSettings.isMuted
        }, [dialog])

        return (
            <div onContextMenu={onContextMenu}>
                <AppLink
                    to={`/dialogs/${dialog.id}`}
                    className={cn(cls.body, {}, [className])}
                    activeClassName={cls.activeClassName}
                >
                    {/* TODO: показываь online, делать это через вебсокет */}
                    <Avatar size={50} src={dialog.avatar} />
                    <div className={cls.info}>
                        <Text text={fullName || dialog.title} />
                        <Text text={dialog.lastMessage.text} />
                    </div>
                    <div className={cls.rightInfo}>
                        <div>
                            <Text
                                size="s"
                                text={formatDate(dialog.lastMessage.timestamp)}
                            />
                        </div>
                        {dialog.userSettings.unreadCount > 0 && (
                            <div
                                className={cn(
                                    cls.unreadCount,
                                    {
                                        [cls.isMuted]: isMutedDialog,
                                    },
                                    [],
                                )}
                            >
                                {dialog.userSettings.unreadCount}
                            </div>
                        )}
                    </div>
                </AppLink>

                {isOpenMenu && (
                    <ContextMenu
                        menuPosition={menuPosition}
                        onCloseMenu={onCloseMenu}
                        isOpenMenu={isOpenMenu}
                        isMutedDialog={isMutedDialog}
                        dialog={dialog}
                    />
                )}
            </div>
        )
    },
)
