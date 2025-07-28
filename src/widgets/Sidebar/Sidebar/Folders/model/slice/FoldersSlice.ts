import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FoldersSchema, FolderType } from '../types/foldersSchema'

const initialState: FoldersSchema = {
    activeFolder: {
        title: 'Все',
        value: 'all',
    },
}

export const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setActiveFolser(state, action: PayloadAction<FolderType>) {
            state.activeFolder = action.payload
        },
    },
})

export const { actions: foldersActions } = foldersSlice
export const { reducer: foldersReducer } = foldersSlice
