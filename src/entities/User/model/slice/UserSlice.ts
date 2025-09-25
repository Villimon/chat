import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/userSchema'
import { initAuthData } from '../services/initAuthData'
import {
    TOKEN_LOCAL_STORAGE_KEY,
    USER_LOCAL_STORAGE_KEY,
} from '@/shared/constants/localstorage'

const initialState: UserSchema = {
    _inited: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<User>) {
            state.authData = action.payload
        },
        logout(state) {
            state.authData = undefined
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
            localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload
                state._inited = true
            },
        )
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true
        })
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
