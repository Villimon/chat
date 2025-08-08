import { DialogSettings, User } from '../model/types/userSchema'
import { rtkApi } from '@/shared/api/rtkApi'
// import GetDialogProps from '@/entities/Dialog/api/DialogApi'

interface ToggleDialogMuteParams {
    userId: string
    dialogSettings: DialogSettings[]
    dialogId: string
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
        toggleDialogMute: build.mutation<User, ToggleDialogMuteParams>({
            query: ({ userId, dialogSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: { dialogSettings },
            }),
            invalidatesTags: (result, error, { dialogId }) => [
                { type: 'Dialogs', id: dialogId }, // Инвалидировать конкретный диалог
                'Dialogs', // Инвалидировать весь список
            ],
        }),
    }),
})

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
export const { useToggleDialogMuteMutation } = userApi
