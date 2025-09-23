import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import cls from './FirstDisplay.module.scss'

export const FirstDisplay = () => {
    return (
        <VStack max gap="4">
            <div className={cls.fistMessage} />
            <div className={cls.secondMessage} />
            <div className={cls.thirdMessage} />
        </VStack>
    )
}
