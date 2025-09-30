import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import cls from './Settings.module.scss'
import LockIcon from '@/shared/assets/icons/lock.svg'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import FolderIcon from '@/shared/assets/icons/folder.svg'
import PaintIcon from '@/shared/assets/icons/paint.svg'
import SettingsIcon from '@/shared/assets/icons/settings.svg'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Icon } from '@/shared/ui/Icon/Icon'

const navigationItems = [
    {
        path: '#settings.general',
        label: 'Основные',
        Icon: SettingsIcon,
    },
    {
        path: '#settings.folders',
        label: 'Папки с чатами',
        Icon: FolderIcon,
    },
    {
        path: '#settings.notification',
        label: 'Уведомления',
        Icon: NotificationIcon,
    },
    {
        path: '#settings.security',
        label: 'Входы в аккаунт',
        Icon: LockIcon,
    },
    {
        path: '#settings.appearence',
        label: 'Оформление и темы',
        Icon: PaintIcon,
    },
]

export const SettingsNavigation = () => {
    return (
        <VStack gap="16" max>
            <Text text="Настройки" variant="secondary" />
            <nav className={cls.nav}>
                <VStack gap="8" max>
                    {navigationItems.map((item) => (
                        <HStack className={cls.menu} max>
                            <AppLink key={item.path} to={item.path}>
                                <Icon Svg={item.Icon} width={25} height={25} />
                                {item.label}
                            </AppLink>
                        </HStack>
                    ))}
                </VStack>
            </nav>
        </VStack>
    )
}
