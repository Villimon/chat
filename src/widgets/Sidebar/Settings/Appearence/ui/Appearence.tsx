import { memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Appearence.module.scss'
import { NavigateBack } from '@/features/NavigateBack'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { DisplayingMessages } from './DisplayingMessages'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { ThemeSelector } from './ThemeSelector'
import { PaletteSelector } from './PaletteSelector'

const Appearence = memo(() => {
    return (
        <aside className={cn(cls.appearenceContainer, {}, [])}>
            <VStack gap="24" max>
                <NavigateBack hash="#settings" />
                <HStack className={cls.menu} max>
                    <AppLink to="#background">Фон чата</AppLink>
                </HStack>
                <DisplayingMessages />
                <div>
                    Список чатов
                    <span>Ращверный ( как сделано сейчас)</span>
                    <span>Компактный - иконка и имя пользователя</span>
                </div>
                <ThemeSelector />
                <PaletteSelector />
            </VStack>
        </aside>
    )
})

export default Appearence
