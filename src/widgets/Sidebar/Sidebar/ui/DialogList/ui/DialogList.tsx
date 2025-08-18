import { memo } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './DialogList.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { useDialogList } from '../../../lib/hooks/useDialogList'
import { useDialogListRenderer } from '../../../lib/hooks/useDialogListRenderer'
import { useDialogListData } from '../../../lib/hooks/useDialogListData'

export const DialogList = memo(({ className }: { className?: string }) => {
    const { handleCloseMenu, handleContextMenu, menuPosition, openedMenuId } = useDialogList()

    const { dialogs, isError, isFetching, isSuccess, loadMore } = useDialogListData()

    const {
        EmptyListPlaceholder,
        LoadingFooter,
        SkeletonDialogCard,
        itemContent,
    } = useDialogListRenderer(
        handleContextMenu,
        handleCloseMenu,
        menuPosition,
        openedMenuId,
    )

    if (!isSuccess && isFetching) {
        return <SkeletonDialogCard className={cls.container} />
    }

    if (isError) {
        return (
            <Text text="Не удалось загрузить список диалогов" align="center" />
        )
    }

    return (
        <div className={cn(cls.container, {}, [className])}>
            <Virtuoso
                data={dialogs?.data}
                style={{ height: 'calc(100vh - 76px)' }}
                itemContent={itemContent}
                endReached={loadMore}
                components={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    Footer: () => <LoadingFooter isFetching={isFetching} />,
                    EmptyPlaceholder: EmptyListPlaceholder,
                }}
            />
        </div>
    )
})
