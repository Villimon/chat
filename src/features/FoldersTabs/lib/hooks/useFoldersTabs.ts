import { useCallback, useMemo } from 'react'
import { TabItem } from '@/shared/ui/Tabs/Tabs'

interface UseFoldersTabs {
    allUnreadMessages?: number
    onChangeFolder: (tab: TabItem) => void
}

export const useFoldersTabs = ({
    onChangeFolder,
    allUnreadMessages,
}: UseFoldersTabs) => {
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

    return { initialFirstTab, onTabClick }
}
