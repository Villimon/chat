import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import cls from './FirstFolderType.module.scss'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { cn } from '@/shared/lib/classNames/classNames'

export const FirstFolderType = () => {
    return (
        <VStack max gap="8" className={cls.body}>
            <HStack max gap="8">
                <div className={cn(cls.folder, {}, [cls.active])} />
                <div className={cls.folder} />
                <div className={cls.folder} />
            </HStack>
            <VStack max gap="4">
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
        </VStack>
    )
}
