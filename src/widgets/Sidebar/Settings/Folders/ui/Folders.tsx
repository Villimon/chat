import { memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Folders.module.scss'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { NavigateBack } from '@/features/NavigateBack'
import { CreateFolderButton } from './CreateFolderButton'
import { ActiveFolders } from './ActiveFolders'
import { FolderType } from './FolderType'

const Folders = memo(() => {
    return (
        <aside className={cn(cls.foldersContainer, {}, [])}>
            <VStack gap="24" max>
                <NavigateBack hash="#settings" />
                <CreateFolderButton />
                <ActiveFolders />
                <FolderType />
            </VStack>
        </aside>
    )
})

export default Folders
