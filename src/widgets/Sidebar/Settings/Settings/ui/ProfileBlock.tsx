import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import cls from './Settings.module.scss'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { Icon } from '@/shared/ui/Icon/Icon'
import SmileIcon from '@/shared/assets/icons/smile.svg'
import FavouritesIcon from '@/shared/assets/icons/favourites.svg'
import { Profile } from './Profile'

const navigationItems = [
    {
        path: '#settings.profile',
        content: <Profile />,
    },
    {
        path: '#settings.status',
        content: 'Изменить статус',
        Icon: SmileIcon,
    },
    {
        path: '',
        content: 'Избранное',
        Icon: FavouritesIcon,
    },
]

export const ProfileBlock = () => {
    return (
        <VStack gap="16" max>
            <nav className={cls.nav}>
                <VStack gap="8" max>
                    {navigationItems.map((item) => (
                        <HStack gap="8" className={cls.menu} max>
                            {item.Icon && (
                                <Icon Svg={item.Icon} width={25} height={25} />
                            )}
                            <AppLink key={item.path} to={item.path}>
                                {item.content}
                            </AppLink>
                        </HStack>
                    ))}
                </VStack>
            </nav>
        </VStack>
    )
}
