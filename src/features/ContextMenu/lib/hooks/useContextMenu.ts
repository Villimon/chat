import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { contextMenuActions } from '../../model/slice/ContextMenuSlice'
import { StateSchema } from '@/app/providers/StoreProvider'

export const useContextMenu = (target: 'dialog' | 'folder') => {
    const dispatch = useAppDispatch()

    const { openedMenuId, position } = useSelector(
        (state: StateSchema) => state.contextMenu,
    )

    const handleContextMenu = useCallback(
        (e: React.MouseEvent, menuId: string) => {
            e.preventDefault()
            dispatch(
                contextMenuActions.openContextMenu({
                    menuId: `${menuId}-${target}`,
                    x: e.clientX,
                    y: e.clientY,
                }),
            )
        },
        [dispatch, target],
    )

    const handleCloseContextMenu = useCallback(() => {
        dispatch(contextMenuActions.closeContextMenu())
    }, [dispatch])

    return {
        openedMenuId,
        position,
        handleContextMenu,
        handleCloseContextMenu,
    }
}
