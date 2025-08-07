import { FC, memo } from 'react'
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs'
import cls from './FoldersTabs.module.scss'
import { useFoldersTabs } from '../lib/hooks/useFoldersTabs'

interface FoldersTabsProps {
    value: TabItem
    onChangeFolder: (tab: TabItem) => void
    tabs: TabItem[]
    allUnreadMessages?: number
}

export const FoldersTabs: FC<FoldersTabsProps> = memo(
    ({ value, onChangeFolder, tabs, allUnreadMessages }) => {
        const { initialFirstTab, onTabClick } = useFoldersTabs({
            onChangeFolder,
            allUnreadMessages,
        })

        return (
            <Tabs
                items={[initialFirstTab, ...(tabs as TabItem[])]}
                onClickTab={onTabClick}
                value={value.value}
                className={cls.tabs}
            />
        )
    },
)
