import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContextMenuSchema } from '../types/ContextMenuSchema'

const initialState: ContextMenuSchema = {
    openedMenuId: null,
    position: {
        x: 0,
        y: 0,
    },
}

export const ContextMenuSlice = createSlice({
    name: 'contextMenu',
    initialState,
    reducers: {
        openContextMenu: (
            state,
            action: PayloadAction<{
                menuId: string
                x: number
                y: number
            }>,
        ) => {
            state.openedMenuId = action.payload.menuId
            state.position = {
                x: action.payload.x,
                y: action.payload.y,
            }
        },
        closeContextMenu: (state) => {
            state.openedMenuId = null
        },
    },
})

export const { actions: contextMenuActions } = ContextMenuSlice
export const { reducer: contextMenuReducer } = ContextMenuSlice
