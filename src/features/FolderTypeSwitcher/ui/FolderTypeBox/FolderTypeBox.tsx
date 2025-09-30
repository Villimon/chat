import { FC, JSX, memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Text } from '@/shared/ui/Text/Text'
import cls from './FolderTypeBox.module.scss'
import { FolderType } from '@/shared/constants/theme'

interface FolderTypeBoxProps {
    className?: string
    folderType: FolderType
    onClick: (folderType: FolderType) => void
    selected: boolean
    title: string
    Content: JSX.Element
}

export const FolderTypeBox: FC<FolderTypeBoxProps> = memo(
    ({ className, folderType, onClick, selected, title, Content }) => {
        return (
            <VStack gap="4">
                <Text text={title} />
                <div
                    className={cn(
                        cls.displayBox,
                        { [cls.selected]: selected },
                        [className, cls[folderType]],
                    )}
                    onClick={() => onClick(folderType)}
                >
                    {Content}
                </div>
            </VStack>
        )
    },
)
