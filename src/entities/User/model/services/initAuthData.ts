import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User } from '../types/userSchema'
import { USER_LOCAL_STORAGE_KEY } from '@/shared/constants/localstorage'
import { getUserDataByIdQuery } from '../../api/userApi'

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkApi) => {
        const { dispatch, rejectWithValue } = thunkApi

        const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY)

        if (!userId) {
            return rejectWithValue('Пользователь не найден')
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap()

            return response
        } catch (error) {
            console.log(error)
            return rejectWithValue('')
        }
    },
)
