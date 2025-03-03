import { NavLink } from 'react-router-dom'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import cls from './ErrorComponent.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { getRouteMain } from '@/shared/constants/routes'

export const ErrorComponent = () => {
    return (
        <VStack
            className={cls.container}
            align="center"
            justify="center"
            gap="8"
        >
            <VStack align="center">
                <Text align="center" title="Ой, что-то пошло не так" />
                <Text
                    align="center"
                    text="Попробуйте повторить позже или вернитесь на главную страницу"
                />
            </VStack>
            <NavLink to={getRouteMain()}>На главную</NavLink>
        </VStack>
    )
}
