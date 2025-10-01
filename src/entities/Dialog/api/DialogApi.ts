import { Dialog, DialogDto } from '@/entities/Dialog/model/types/dialogSchema'
import { rtkApi } from '@/shared/api/rtkApi'

export interface GetDialogProps {
    userId: string
    limit?: number
    page?: number
    folder?: string
    query?: string
}

interface MutateDialogParams {
    userId: string
    dialogId: string
}

interface DialogFolderActionsParams {
    userId: string
    dialogId: string
    valueFolder: string
}

interface DeleteDialogParams {
    dialogId: string
}

interface ToggleDialogPinParams extends DialogFolderActionsParams {
    nextOrder: number
    pinned: boolean
}

// TODO: сделать прерывание запроса
// TODO: прокидывать folder для правильной инвалидации
export const dialogApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDialog: build.query<DialogDto, GetDialogProps>({
            query: ({ userId, limit = 20, page = 1, folder, query }) => ({
                url: '/dialogs',
                method: 'GET',
                params: {
                    userId,
                    _limit: limit,
                    _page: page,
                    _query: query,
                    _sort: 'lastMessage.timestamp',
                    folder: folder !== 'all' ? folder : undefined,
                },
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const { page, ...otherParams } = queryArgs
                return [endpointName, otherParams]
            },
            merge: (currentCache, newItems, { arg }) => {
                const currentPage = arg.page

                if (currentPage === 1 || arg.query) {
                    return newItems
                }

                if (!currentCache?.data || !newItems?.data) {
                    return newItems
                }

                return {
                    ...newItems,
                    data: [...currentCache.data, ...newItems.data],
                }
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                if (!previousArg) return false
                return currentArg?.page !== previousArg?.page
            },
            providesTags: (result) => [
                ...(result?.data.map((dialog) => {
                    return { type: 'Dialogs' as const, id: dialog.id }
                }) || []),
                'Dialogs',
            ],
        }),
        getDialogById: build.query<
            Dialog,
            { userId: string; dialogId: string }
        >({
            query: ({ userId, dialogId }) => ({
                url: `/dialogs/${dialogId}`,
                method: 'GET',
                params: { userId },
            }),
        }),
        toggleDialogMute: build.mutation<
            DialogDto,
            MutateDialogParams & { folder: string }
        >({
            query: ({ dialogId, userId }) => ({
                url: `/dialogs/${dialogId}/toggle-mute`,
                method: 'PATCH',
                body: { userId },
            }),
            async onQueryStarted(
                { dialogId, userId, folder },
                { dispatch, queryFulfilled },
            ) {
                // TODO: если при наличие других параметров(старица или запрос) не будет происходить оптимистичный апдейт, то нужно будет прокидывать сюда все параметры или создать хук(пример снизу)
                const patchResult = dispatch(
                    rtkApi.util.updateQueryData(
                        // @ts-ignore
                        'getDialog',
                        {
                            userId,
                            folder,
                            limit: 20,
                            page: 1,
                            query: '',
                        },
                        (draft: DialogDto) => {
                            const dialog = draft.data.find(
                                (d) => d.id === dialogId,
                            )
                            if (dialog) {
                                dialog.userSettings.isMuted =
                                    !dialog.userSettings.isMuted
                            }
                        },
                    ),
                )
                try {
                    await queryFulfilled
                } catch {
                    // Если запрос провалился — откатываем изменения
                    patchResult.undo()
                }
            },
            invalidatesTags: (_res, _err, { dialogId }) => [
                { type: 'Dialogs', id: dialogId },
            ],
        }),
        leaveDialog: build.mutation<DialogDto, MutateDialogParams>({
            query: ({ dialogId, userId }) => ({
                url: `/dialogs/${dialogId}/leave-dialog`,
                method: 'PATCH',
                body: { userId },
            }),
            invalidatesTags: ['Dialogs'],
        }),
        deleteDialog: build.mutation<DialogDto, DeleteDialogParams>({
            query: ({ dialogId }) => ({
                url: `/dialogs/${dialogId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Dialogs'],
        }),
        updateReadStatus: build.mutation<
            DialogDto,
            MutateDialogParams & { folder: string }
        >({
            query: ({ dialogId, userId }) => ({
                url: `/dialogs/${dialogId}/update-read-status`,
                method: 'PATCH',
                body: { userId },
            }),
            async onQueryStarted(
                { dialogId, userId, folder },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    rtkApi.util.updateQueryData(
                        // @ts-ignore
                        'getDialog',
                        {
                            userId,
                            folder,
                            limit: 20,
                            page: 1,
                            query: '',
                        },
                        (draft: DialogDto) => {
                            const dialog = draft.data.find(
                                (d) => d.id === dialogId,
                            )
                            if (dialog) {
                                dialog.userSettings.unreadCount =
                                    dialog.userSettings.unreadCount > 0 ? 0 : 1
                            }
                        },
                    ),
                )
                try {
                    await queryFulfilled
                } catch {
                    // Если запрос провалился — откатываем изменения
                    patchResult.undo()
                }
            },
            invalidatesTags: ['Dialogs'],
        }),
        addToFolder: build.mutation<DialogDto, DialogFolderActionsParams>({
            query: ({ dialogId, userId, valueFolder }) => ({
                url: `/dialogs/${dialogId}/add-to-folder`,
                method: 'PATCH',
                body: { userId, valueFolder },
            }),
            invalidatesTags: ['Dialogs'],
        }),
        removeToFolder: build.mutation<DialogDto, DialogFolderActionsParams>({
            query: ({ dialogId, userId, valueFolder }) => ({
                url: `/dialogs/${dialogId}/remove-to-folder`,
                method: 'PATCH',
                body: { userId, valueFolder },
            }),
            invalidatesTags: ['Dialogs'],
        }),
        toggleDialogPin: build.mutation<DialogDto, ToggleDialogPinParams>({
            query: ({ dialogId, userId, valueFolder, nextOrder, pinned }) => ({
                url: `/dialogs/${dialogId}/pinning-dialog`,
                method: 'PATCH',
                body: { userId, valueFolder, nextOrder, pinned },
            }),
            invalidatesTags: ['Dialogs'],
        }),
    }),
})

export const useGetDialog = dialogApi.useGetDialogQuery
export const useToggleDialog = dialogApi.useToggleDialogMuteMutation
export const useLeaveDialog = dialogApi.useLeaveDialogMutation
export const useDeleteDialog = dialogApi.useDeleteDialogMutation
export const useUpdateReadStatus = dialogApi.useUpdateReadStatusMutation
export const useAddToFolder = dialogApi.useAddToFolderMutation
export const useRemoveToFolder = dialogApi.useRemoveToFolderMutation
export const useToggleDialogPin = dialogApi.useToggleDialogPinMutation
export const useGetDialogById = dialogApi.useGetDialogByIdQuery
export const getDialog = dialogApi.endpoints.getDialog.initiate

/*
export const useDialogParams = () => {
  const paramsRef = useRef<any>();

  const { data } = useGetDialogQuery(paramsRef.current, {
    onSuccess: (_, args) => {
      paramsRef.current = args;
    }
  });

  return paramsRef.current || {
    userId: '',
    limit: 20,
    page: 1,
    folder: 'all',
    query: ''
  };
};

*/
