import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import cls from './SecondDisplayLayout.module.scss'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'

export const SecondDisplayLayout = () => {
    return (
        <VStack max gap="4" className={cls.body}>
            {Array(4)
                .fill(0)
                .map((item, index) => (
                    <HStack gap="8" max key={index}>
                        <div className={cls.avatar} />
                        <div className={cls.username} />
                    </HStack>
                ))}
        </VStack>
    )
}
