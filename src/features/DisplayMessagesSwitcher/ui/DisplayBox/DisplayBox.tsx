import { FC, JSX, memo } from 'react'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import { Display } from '@/shared/constants/theme'
import cls from './DisplayBox.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'

interface DisplayBoxProps {
    className?: string
    display: Display
    onClick: (theme: Display) => void
    selected: boolean
    title: string
    content: JSX.Element
}

export const DisplayBox: FC<DisplayBoxProps> = memo(
    ({ className, display, onClick, selected, title, content }) => {
        return (
            <VStack gap="4">
                <Text text={title} />
                <div
                    className={cn(
                        cls.displayBox,
                        { [cls.selected]: selected },
                        [className, cls[display]],
                    )}
                    onClick={() => onClick(display)}
                >
                    <div className={cn(cls.firstDisplay, {}, [])} />
                    <div className={cn(cls.secondDisplay, {}, [])} />
                    {content}
                </div>
            </VStack>
        )
    },
)
