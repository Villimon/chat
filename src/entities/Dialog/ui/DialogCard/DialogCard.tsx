import { FC, memo, useMemo } from 'react'
import { format, isThisWeek, isToday, setDefaultOptions } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useSelector } from 'react-redux'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Text } from '@/shared/ui/Text/Text'
import cls from './DialogCard.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'
import { Dialog } from '../../model/types/dialogSchema'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { MenuPosition } from '../../model/types'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Icon } from '@/shared/ui/Icon/Icon'
import PinIcon from '@/shared/assets/icons/pin.svg'
import { getActiveFolder } from '../../../../widgets/Sidebar/Sidebar/model/selectors/getActiveFolder/getActiveFolder'
import { DialogMenu } from '@/features/ContextMenu'
import { useAppearance } from '@/shared/hooks/useAppearance/useAppearance'

interface DialogCardProps {
    dialog: Dialog
    className?: string
    onCloseMenu?: () => void
    onContextMenu?: (e: React.MouseEvent) => void
    isOpenMenu?: boolean
    menuPosition?: MenuPosition
    nextOrder: number
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
        nextOrder,
    }) => {
        const { dialogLayout } = useAppearance()
        const fullName = dialog.interlocutor?.firstName && dialog.interlocutor?.lastName
            ? `${dialog.interlocutor?.firstName} ${dialog.interlocutor?.lastName}`
            : undefined
        const isDeafaultDialogLayout = dialogLayout === 'expanded'

        const activeFolder = useSelector(getActiveFolder)

        const isMutedDialog = useMemo(() => {
            return dialog.userSettings.isMuted
        }, [dialog])

        const isPined = useMemo(() => {
            return dialog.userSettings.pinned?.[activeFolder.value]?.isPinned
        }, [activeFolder.value, dialog.userSettings.pinned])

        return (
            <div
                onContextMenu={onContextMenu}
                className={cn('', {}, [cls[dialogLayout]])}
            >
                <AppLink
                    to={`/dialogs/${dialog.id}`}
                    className={cn(cls.body, {}, [className])}
                    activeClassName={cls.activeClassName}
                >
                    {/* TODO: показываь online, делать это через вебсокет */}
                    <Avatar
                        size={isDeafaultDialogLayout ? 50 : 30}
                        src={dialog.avatar}
                    />
                    <VStack className={cls.info}>
                        <Text text={fullName || dialog.title} />
                        {isDeafaultDialogLayout && (
                            <Text text={dialog.lastMessage.text} />
                        )}
                    </VStack>
                    {isDeafaultDialogLayout ? (
                        <VStack
                            gap="8"
                            className={cls.rightInfo}
                            justify="start"
                            align="end"
                        >
                            <HStack gap="4">
                                {isPined && (
                                    <Icon
                                        Svg={PinIcon}
                                        height={25}
                                        width={25}
                                    />
                                )}
                                <Text
                                    size="s"
                                    text={formatDate(
                                        dialog.lastMessage.timestamp,
                                    )}
                                />
                            </HStack>
                            {dialog.userSettings.unreadCount > 0 && (
                                <HStack
                                    align="center"
                                    justify="center"
                                    className={cn(
                                        cls.unreadCount,
                                        {
                                            [cls.isMuted]: isMutedDialog,
                                        },
                                        [],
                                    )}
                                >
                                    {dialog.userSettings.unreadCount}
                                </HStack>
                            )}
                        </VStack>
                    ) : (
                        <HStack gap="8" className={cls.rightInfo}>
                            <HStack gap="4">
                                {isPined && (
                                    <Icon
                                        Svg={PinIcon}
                                        height={25}
                                        width={25}
                                    />
                                )}
                            </HStack>
                            {dialog.userSettings.unreadCount > 0 && (
                                <HStack
                                    align="center"
                                    justify="center"
                                    className={cn(
                                        cls.unreadCount,
                                        {
                                            [cls.isMuted]: isMutedDialog,
                                        },
                                        [],
                                    )}
                                >
                                    {dialog.userSettings.unreadCount}
                                </HStack>
                            )}
                        </HStack>
                    )}
                </AppLink>

                {isOpenMenu && (
                    <DialogMenu
                        menuPosition={menuPosition}
                        onCloseMenu={onCloseMenu}
                        isOpenMenu={isOpenMenu}
                        isMutedDialog={isMutedDialog}
                        dialog={dialog}
                        nextOrder={nextOrder}
                        isPinedDialog={isPined}
                    />
                )}
            </div>
        )
    },
)
