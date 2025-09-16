import { useSelector } from 'react-redux'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import cls from './Settings.module.scss'
import { getUserData } from '@/entities/User'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Avatar } from '@/shared/ui/Avatar/Avatar'

export const Profile = () => {
    const userData = useSelector(getUserData)

    if (!userData) {
        return null
    }

    const initials = `${userData.firstName[0]} ${userData.lastName[0]}`.toUpperCase()

    return (
        <HStack gap="16" max className={cls.profile}>
            {userData?.avatar ? (
                <Avatar src={userData.avatar} />
            ) : (
                <Text className={cls.avatar} text={initials} />
            )}
            <VStack max>
                <Text text={`${userData.firstName} ${userData.lastName}`} />
                <Text label={userData.username} />
            </VStack>
        </HStack>
    )
}
