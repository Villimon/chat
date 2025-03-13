import { User } from '../model/types/userSchema'
import { rtkApi } from '@/shared/api/rtkApi'

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
})

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
