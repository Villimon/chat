import { User } from '../model/types/userSchema'
import { rtkApi } from '@/shared/api/rtkApi'

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
            providesTags: (result, error, userId) => [
                { type: 'User', id: userId },
            ],
        }),
        createNewFolder: build.mutation<
            User,
            { userId: string; folderName: string }
        >({
            query: ({ folderName, userId }) => ({
                url: `/users/${userId}`,
                method: 'POST',
                body: { folderName },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'User', id: userId },
            ],
        }),
    }),
})

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
export const useCreateNewFolder = userApi.useCreateNewFolderMutation
