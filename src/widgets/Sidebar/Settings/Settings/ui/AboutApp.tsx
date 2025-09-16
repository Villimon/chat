import { useCallback } from 'react'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import cls from './Settings.module.scss'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Button } from '@/shared/ui/Button'
import ExitIcon from '@/shared/assets/icons/exit.svg'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { userActions } from '@/entities/User'

export const AboutApp = () => {
    const dispatch = useAppDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    return (
        <VStack gap="16" max>
            <Text text="О приложении" variant="secondary" />
            <VStack gap="16" max>
                <HStack gap="8" className={cls.menu} max>
                    <Icon Svg={ExitIcon} width={25} height={25} />
                    <Button
                        onClick={logoutHandler}
                        variant="clear"
                        color="error"
                    >
                        Выйти из аккаунта
                    </Button>
                </HStack>
                <Text label={`ВЕРСИЯ: ${__APP_VERSION__}`} />
            </VStack>
        </VStack>
    )
}
