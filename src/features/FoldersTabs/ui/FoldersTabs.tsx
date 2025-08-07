import { FC, memo, useCallback, useMemo } from 'react'
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs'
import cls from './FoldersTabs.module.scss'

interface FoldersTabsProps {
    value: TabItem
    onChangeFolder: (tab: TabItem) => void
    tabs: TabItem[]
    allUnreadMessages?: number
}

export const FoldersTabs: FC<FoldersTabsProps> = memo(
    ({ value, onChangeFolder, tabs, allUnreadMessages }) => {
        const initialFirstTab = useMemo(() => {
            return {
                title: 'Все',
                value: 'all',
                unreadCount: allUnreadMessages,
            }
        }, [allUnreadMessages])

        const onTabClick = useCallback(
            (tab: TabItem) => {
                onChangeFolder(tab)
            },
            [onChangeFolder],
        )

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
