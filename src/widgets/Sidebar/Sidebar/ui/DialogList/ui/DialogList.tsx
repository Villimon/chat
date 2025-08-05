import { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { DialogCard } from '@/entities/Dialog'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './DialogList.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import clsCard from '@/entities/Dialog/ui/DialogCard/DialogCard.module.scss'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { getPage } from '../../../model/selectors/getPage/getPage'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { sidebarActions } from '../../../model/slice/sidebar'
import { useDialogFetching } from '../../../api/useDialogFetching'

const SkeletonDialogCard = memo(({ className }: { className: string }) => {
    return (
        <div className={cn('', {}, [className])}>
            {Array(18)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className={clsCard.body}>
                        <Skeleton width={50} height={50} border="50%" />
                        <div className={clsCard.info}>
                            <Skeleton
                                width={200}
                                height={20}
                                className={cls.skeletonTitle}
                            />
                            <Skeleton width={300} height={20} />
                        </div>
                        <div>
                            <Skeleton
                                width={30}
                                height={20}
                                className={cls.skeletonDate}
                            />
                        </div>
                    </div>
                ))}
        </div>
    )
})

const LoadingFooter = memo(({ isFetching }: { isFetching: boolean }) => {
    return isFetching ? (
        <SkeletonDialogCard className={cls.skeletonContainer} />
    ) : null
})

const EmptyListPlaceholder = memo(() => (
    <Text text="Список диалогов пуст" align="center" />
))

// TODO навести тут порядок
export const DialogList = memo(({ className }: { className?: string }) => {
    const page = useSelector(getPage)
    const dispatch = useAppDispatch()

    const [openedMenuId, setOpenedMenuId] = useState<string | null>()
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

    const {
        data: dialogs,
        isError,
        isFetching,
        isSuccess,
    } = useDialogFetching()

    const loadMore = useCallback(() => {
        if (!isFetching && dialogs && page < dialogs?.totalPages) {
            dispatch(sidebarActions.setPage(1))
        }
    }, [isFetching, dialogs, page, dispatch])

    const handleContextMenu = useCallback(
        (e: React.MouseEvent, dialogId: string) => {
            e.preventDefault()
            setMenuPosition({ x: e.clientX, y: e.clientY })
            setOpenedMenuId(dialogId)
        },
        [],
    )

    const handleCloseMenu = useCallback(() => {
        setOpenedMenuId(null)
    }, [])

    const itemContent = useCallback(
        (index: number, dialog: Dialog) => (
            <DialogCard
                key={dialog.id}
                dialog={dialog}
                className={cls.dialogItem}
                onCloseMenu={handleCloseMenu}
                onContextMenu={(e) => handleContextMenu(e, dialog.id)}
                isOpenMenu={openedMenuId === dialog.id}
                menuPosition={menuPosition}
            />
        ),
        [openedMenuId, menuPosition, handleCloseMenu, handleContextMenu],
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
