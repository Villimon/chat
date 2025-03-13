import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/userSchema'
import { initAuthData } from '../services/initAuthData'

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
        logout(state, action: PayloadAction<string>) {
            state.authData = undefined
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
