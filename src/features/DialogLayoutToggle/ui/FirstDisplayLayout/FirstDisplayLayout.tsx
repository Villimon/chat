import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import cls from './FirstDisplayLayout.module.scss'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'

export const FirstDisplayLayout = () => {
    return (
        <VStack max gap="8" className={cls.body}>
            {Array(3)
                .fill(0)
                .map((item, index) => (
                    <HStack max gap="8">
                        <div className={cls.avatar} />
                        <VStack max gap="4" key={index}>
                            <div className={cls.username} />
                            <div className={cls.message} />
                        </VStack>
                    </HStack>
                ))}
        </VStack>
    )
}
