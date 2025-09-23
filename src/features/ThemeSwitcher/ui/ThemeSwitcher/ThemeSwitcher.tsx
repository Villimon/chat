import { useCallback } from 'react'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Theme } from '@/shared/constants/theme'
import { ThemeBox } from '../../ui/ThemeBox/ThemeBox'
import { themeBoxes } from '../../model/consts/themeBoxes'
import { useTheme } from '@/shared/hooks/useTheme/useTheme'

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme()

    const onToggleHandlerTheme = useCallback(
        (theme: Theme) => {
            toggleTheme(theme)
        },
        [toggleTheme],
    )

    return (
        <HStack gap="8">
            {themeBoxes.map((item) => (
                <ThemeBox
                    onClick={onToggleHandlerTheme}
                    selected={theme === item.theme}
                    key={item.id}
                    theme={item.theme}
                    title={item.title}
                />
            ))}
        </HStack>
    )
}
