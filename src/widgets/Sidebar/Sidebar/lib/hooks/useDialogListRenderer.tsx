import { memo, useCallback } from 'react'
import { DialogCard } from '@/entities/Dialog'
import { Dialog } from '@/entities/Dialog/model/types/dialogSchema'
import cls from '../../ui/DialogList/ui/DialogList.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import clsCard from '@/entities/Dialog/ui/DialogCard/DialogCard.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'
import { useContextMenu } from '@/features/ContextMenu'

export const useDialogListRenderer = (getNextOrder: () => number) => {
    const {
        handleContextMenu,
        openedMenuId,
        position,
        handleCloseContextMenu,
    } = useContextMenu('dialog')

    const itemContent = useCallback(
        (index: number, dialog: Dialog) => (
            <DialogCard
                key={dialog.id}
                dialog={dialog}
                className={cls.dialogItem}
                onContextMenu={(e) => handleContextMenu(e, dialog.id)}
                isOpenMenu={openedMenuId === `${dialog.id}-dialog`}
                nextOrder={getNextOrder()}
                menuPosition={position}
                onCloseMenu={handleCloseContextMenu}
            />
        ),
        [
            openedMenuId,
            getNextOrder,
            handleContextMenu,
            handleCloseContextMenu,
            position,
        ],
    )

    const EmptyListPlaceholder = memo(() => (
        <Text text="Список диалогов пуст" align="center" />
    ))

    const SkeletonDialogCard = memo(({ className }: { className: string }) => {
        return (
            <div className={cn('', {}, [className])}>
                {Array(10)
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

    return {
        itemContent,
        EmptyListPlaceholder,
        SkeletonDialogCard,
        LoadingFooter,
    }
}
