import { memo } from 'react'
import { Theme } from '@/shared/constants/theme'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './ThemeBox.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'

interface ThemeBoxProps {
    className?: string
    theme: Theme
    onClick: (theme: Theme) => void
    selected: boolean
    title: string
}

export const ThemeBox = memo(
    ({ className, theme, onClick, selected, title }: ThemeBoxProps) => {
        return (
            <VStack gap="4">
                <Text text={title} />
                <div
                    className={cn(cls.themeBox, { [cls.selected]: selected }, [
                        className,
                        cls[theme],
                    ])}
                    onClick={() => onClick(theme)}
                >
                    <div className={cn(cls.firstMessage, {}, [])} />
                    <div className={cn(cls.secondMessage, {}, [])} />
                </div>
            </VStack>
        )
    },
)
