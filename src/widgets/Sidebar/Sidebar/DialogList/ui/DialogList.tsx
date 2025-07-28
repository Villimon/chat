import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { DialogCard, useGetDialog } from '@/entities/Dialog'
import { getUserData } from '@/entities/User'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './DialogList.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import clsCard from '@/entities/Dialog/ui/DialogCard.module.scss'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import { getPage } from '../model/selectors/getPage/getPage'
import { getLimit } from '../model/selectors/getLimit/getLimit'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { dialogListActions } from '../model/slice/DialogList'
import { getActiveFolder } from '../../Folders/model/selectors/getActiveFolder/getActiveFolder'

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

export const DialogList = memo(({ className }: { className?: string }) => {
    const userData = useSelector(getUserData)
    const activeFolder = useSelector(getActiveFolder)
    const page = useSelector(getPage)
    const limit = useSelector(getLimit)
    const dispatch = useAppDispatch()

    const {
        data: dialogs,
        isLoading,
        isError,
        isFetching,
        isSuccess,
    } = useGetDialog({
        userId: userData?.id ?? '',
        page,
        limit,
        folder: activeFolder.value,
    })

    const loadMore = useCallback(() => {
        if (!isFetching && dialogs && page < dialogs?.totalPages) {
            dispatch(dialogListActions.setPage(1))
        }
    }, [isFetching, dialogs, page, dispatch])

    const itemContent = useCallback(
        (index: number, dialog: Dialog) => (
            <DialogCard
                key={dialog.id}
                dialog={dialog}
                className={cls.dialogItem}
            />
        ),
        [],
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
