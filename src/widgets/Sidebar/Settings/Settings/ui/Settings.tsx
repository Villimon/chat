import { memo } from 'react'
import { SettingsNavigation } from './SettingsNavigation'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Settings.module.scss'
import { NavigateBack } from '@/features/NavigateBack'
import { AboutApp } from './AboutApp'

const Settings = memo(() => {
    return (
        <aside className={cn(cls.settingsContainer, {}, [])}>
            <VStack gap="32">
                <NavigateBack />
                <div>Профиль</div>
                <div>Блок с пунктами статуса и избранное</div>
                <SettingsNavigation />
                <AboutApp />
            </VStack>
        </aside>
    )
})

export default Settings
