import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import cls from './SecondFolderType.module.scss'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { cn } from '@/shared/lib/classNames/classNames'

export const SecondFolderType = () => {
    return (
        <HStack max gap="8" className={cls.body}>
            <VStack gap="8">
                <div className={cn(cls.folder, {}, [cls.active])} />
                <div className={cls.folder} />
                <div className={cls.folder} />
            </VStack>
            <div className={cls.divider} />
            <VStack max gap="8">
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
        </HStack>
    )
}
