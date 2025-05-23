import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'

const initialState: LoginSchema = {
    isLoading: false,
    password: '',
    remember: false,
    username: '',
    error: undefined,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload
        },
        setRemember(state, action: PayloadAction<boolean>) {
            state.remember = action.payload
        },
    },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
