import { useCallback } from 'react'
import { SecondFolderType } from '../SecondFolderType/SecondFolderType'
import { FirstFolderType } from '../FirstFolderType/FirstFolderType'
import { FolderTypeBox } from '../FolderTypeBox/FolderTypeBox'
import { FolderType } from '@/shared/constants/theme'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { useAppearance } from '@/shared/hooks/useAppearance/useAppearance'

export const variantsFolderType = [
    {
        id: '1',
        folderType: FolderType.PANEL_TOP,
        title: 'Панель вверху',
        Content: <FirstFolderType />,
    },
    {
        id: '2',
        folderType: FolderType.PANEL_LEFT,
        title: 'Панель слева',
        Content: <SecondFolderType />,
    },
]

export const FolderTypeSwitcher = () => {
    const { folderType, toggleFolderType } = useAppearance()

    const onToggleFolderTypeHandler = useCallback(
        (folderType: FolderType) => {
            toggleFolderType(folderType)
        },
        [toggleFolderType],
    )

    return (
        <HStack gap="32">
            {variantsFolderType.map((item) => (
                <FolderTypeBox
                    onClick={onToggleFolderTypeHandler}
                    selected={folderType === item.folderType}
                    key={item.id}
                    folderType={item.folderType}
                    title={item.title}
                    Content={item.Content}
                />
            ))}
        </HStack>
    )
}
