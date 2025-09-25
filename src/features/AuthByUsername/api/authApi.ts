import { User, userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import {
    TOKEN_LOCAL_STORAGE_KEY,
    USER_LOCAL_STORAGE_KEY,
} from '@/shared/constants/localstorage'

export interface LoginByUsernameProps {
    username: string
    password: string
    remember: boolean
}

const authApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<User, LoginByUsernameProps>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled // Ожидаем завершения запроса
                    // После успешного выполнения запроса dispatch другого action
                    dispatch(userActions.setAuthData(result.data))

                    localStorage.setItem(USER_LOCAL_STORAGE_KEY, result.data.id)
                    localStorage.setItem(
                        TOKEN_LOCAL_STORAGE_KEY,
                        result.data.token,
                    )
                } catch (error) {
                    // Обработка ошибок, если необходимо
                    console.error('Ошибка при выполнении запроса:', error)
                }
            },
        }),
    }),
})

export const { useLoginMutation } = authApi
