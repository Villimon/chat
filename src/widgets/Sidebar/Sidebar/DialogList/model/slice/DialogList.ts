import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialogListSchema } from '../types/dialogListSchema'

const initialState: DialogListSchema = {
    page: 1,
    limit: 20,
}

export const dialogList = createSlice({
    name: 'dialog-list',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page += action.payload
        },
    },
})

export const { actions: dialogListActions } = dialogList
export const { reducer: dialogListReducer } = dialogList
