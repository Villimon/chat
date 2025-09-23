import { SettingsType, User } from '../model/types/userSchema'
import { rtkApi } from '@/shared/api/rtkApi'

interface EditFolderParams {
    userId: string
    folderValue: string
    newTitle: string
}

interface DeleteFolderParams {
    userId: string
    folderValue: string
}

interface SetUserSettings {
    userId: string
    userSettings: SettingsType
}

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
        editFolder: build.mutation<User, EditFolderParams>({
            query: ({ folderValue, userId, newTitle }) => ({
                url: `/users/${userId}/folder-edit`,
                method: 'PATCH',
                body: { folderValue, newTitle },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'User', id: userId },
            ],
        }),
        deleteFolder: build.mutation<User, DeleteFolderParams>({
            query: ({ folderValue, userId }) => ({
                url: `/users/${userId}/folder-delete`,
                method: 'DELETE',
                body: { folderValue },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'User', id: userId },
            ],
        }),
        setUserSettings: build.mutation<User, SetUserSettings>({
            query: ({ userSettings, userId }) => ({
                url: `/users/${userId}/user-settings`,
                method: 'PATCH',
                body: { userSettings },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'User', id: userId },
            ],
        }),
    }),
})

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
export const useCreateNewFolder = userApi.useCreateNewFolderMutation
export const useSetUserSettings = userApi.useSetUserSettingsMutation
export const useEditFolder = userApi.useEditFolderMutation
export const useDeleteFolder = userApi.useDeleteFolderMutation
