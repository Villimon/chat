import { FC, memo, useCallback } from 'react'
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs'
import cls from './FoldersTabs.module.scss'
import { useFoldersTabs } from '../lib/hooks/useFoldersTabs'
import { useContextMenu } from '../../ContextMenu/lib/hooks/useContextMenu'
import { FolderMenu } from '../../ContextMenu/ui/FolderMenu/FolderMenu'

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

        const {
            handleCloseContextMenu,
            handleContextMenu,
            openedMenuId,
            position,
        } = useContextMenu('folder')

        const contextmenu = useCallback(
            (tab: TabItem) => (
                <FolderMenu
                    isOpenMenu={openedMenuId === `${tab.value}-folder`}
                    menuPosition={position}
                    onCloseMenu={handleCloseContextMenu}
                    tab={tab}
                />
            ),
            [openedMenuId, handleCloseContextMenu, position],
        )

        return (
            <Tabs
                items={[initialFirstTab, ...(tabs as TabItem[])]}
                onClickTab={onTabClick}
                value={value.value}
                className={cls.tabs}
                onContextMenu={handleContextMenu}
                openedMenuId={openedMenuId}
                isContextmenu
                contextmenu={contextmenu}
            />
        )
    },
)
