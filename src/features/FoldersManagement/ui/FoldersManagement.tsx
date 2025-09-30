import { memo, useCallback } from 'react'

import cls from './FoldersManagement.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import MenuIcon from '@/shared/assets/icons/menu.svg'
import TrashIcon from '@/shared/assets/icons/trash.svg'
import { Icon } from '@/shared/ui/Icon/Icon'
import { FolderType } from '@/entities/User/model/types/userSchema'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { useFoldersManagement } from '../lib/hooks/useFoldersManagement'

export const FoldersManagement = memo(() => {
    const {
        folders,
        handleDeleteFolder,
        handleDragLeave,
        handleDragOver,
        handleDragStart,
        handleDrop,
    } = useFoldersManagement()

    const renderFolder = useCallback(
        (folder: FolderType) => (
            <HStack
                max
                gap="16"
                draggable
                onDragStart={(e) => handleDragStart(e, folder)}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e, folder)}
                className={cls.block}
            >
                <Icon Svg={MenuIcon} width={20} height={20} />
                <Text className={cls.folderName} text={folder.title} />
                <Icon
                    clickable
                    onClick={() => handleDeleteFolder(folder.value)}
                    Svg={TrashIcon}
                    width={20}
                    height={20}
                />
            </HStack>
        ),
        [
            handleDragStart,
            handleDragOver,
            handleDragLeave,
            handleDrop,
            handleDeleteFolder,
        ],
    )

    return (
        <VStack max gap="16">
            {folders?.map(renderFolder)}
        </VStack>
    )
})
