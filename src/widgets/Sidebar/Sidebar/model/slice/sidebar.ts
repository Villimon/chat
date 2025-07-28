import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FolderType, SidebarSchema } from '../types/sidebarSchema'

const initialState: SidebarSchema = {
    page: 1,
    limit: 20,
    activeFolder: {
        title: 'Все',
        value: 'all',
    },
}

export const sidebar = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page += action.payload
        },
        setActiveFolser(state, action: PayloadAction<FolderType>) {
            state.activeFolder = action.payload
        },
        reset(state) {
            state.limit = initialState.limit
            state.page = initialState.page
        },
    },
})

export const { actions: sidebarActions } = sidebar
export const { reducer: sidebarReducer } = sidebar
