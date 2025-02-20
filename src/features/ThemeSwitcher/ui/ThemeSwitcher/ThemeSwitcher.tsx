import { useCallback } from 'react'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Theme } from '@/shared/constants/theme'
import { ThemeBox } from '../../ui/ThemeBox/ThemeBox'
import { useTheme } from '@/shared/hooks/useTheme/usetheme'

// TODO: Подумать чтобы вынести это в отдельное место
const themeBoxes = [
    {
        id: '1',
        theme: Theme.LIGHT,
        title: 'Светлая',
    },
    {
        id: '2',
        theme: Theme.DARK,
        title: 'Темная',
    },
]

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
