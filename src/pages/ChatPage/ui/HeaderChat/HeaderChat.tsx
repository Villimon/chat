import { FC, memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import cls from './HeaderChat.module.scss'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Icon } from '@/shared/ui/Icon/Icon'

interface HeaderChatProps {
    className?: string
    dialogInfo?: Dialog
}

export const HeaderChat: FC<HeaderChatProps> = memo(
    ({ className, dialogInfo }) => {
        const initials = `${dialogInfo?.interlocutor?.firstName[0]}${dialogInfo?.interlocutor?.lastName[0]}`.toUpperCase()
        const [firstWordGroup, secondWordGroup] = dialogInfo?.title?.split(' ') || []
        const initialsGroup = `${firstWordGroup ? firstWordGroup[0] : ''}${
            secondWordGroup ? secondWordGroup[0] : ''
        }`.toUpperCase()

        return (
            <HStack max justify="between" className={cn('', {}, [className])}>
                <HStack gap="16" className={cls.userInfo}>
                    <Avatar
                        src={dialogInfo?.interlocutor?.avatar}
                        initials={
                            dialogInfo?.interlocutor ? initials : initialsGroup
                        }
                    />
                    <VStack>
                        <Text
                            text={
                                dialogInfo?.interlocutor
                                    ? `${dialogInfo?.interlocutor?.firstName} ${dialogInfo?.interlocutor?.lastName}`
                                    : dialogInfo?.title
                            }
                        />
                        <Text size="s" text="В сети" variant="secondary" />
                    </VStack>
                </HStack>
                <HStack>
                    {/* TODO: реализовать поиск по диалогу */}
                    <Icon Svg={SearchIcon} clickable onClick={() => {}} />
                </HStack>
            </HStack>
        )
    },
)
