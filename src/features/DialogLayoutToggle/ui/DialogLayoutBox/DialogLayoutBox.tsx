import { FC, JSX, memo } from 'react'
import { DialogLayout } from '@/shared/constants/theme'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './DialogLayoutBox.module.scss'

interface DialogLayoutBoxProps {
    className?: string
    display: DialogLayout
    onClick: (theme: DialogLayout) => void
    selected: boolean
    title: string
    content: JSX.Element
}

export const DialogLayoutBox: FC<DialogLayoutBoxProps> = memo(
    ({ className, display, onClick, selected, title, content }) => {
        return (
            <VStack gap="4">
                <Text text={title} />
                <div
                    className={cn(
                        cls.dialogLayoutBox,
                        { [cls.selected]: selected },
                        [className, cls[display]],
                    )}
                    onClick={() => onClick(display)}
                >
                    {content}
                </div>
            </VStack>
        )
    },
)
