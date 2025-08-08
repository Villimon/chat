import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'
import { rtkApi } from '@/shared/api/rtkApi'

export interface GetDialogProps {
    userId: string
    limit?: number
    page?: number
    folder?: string
    query?: string
}

interface ToggleDialogMuteParams {
    userId: string
    dialogId: string
}

// TODO: сделать прерывание запроса
// TODO: проблема в том, что нет кеша по стараницам(если есть появляются свои проблемы с отрисовкой данных), от сюда проблема в том, что данные запрашиваются по новому а не берутся с кеша, если менялось page
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

                // const newData = newItems.data.filter(
                //     (newItem) =>
                //         !currentCache.data.some(
                //             (cachedItem) => cachedItem.id === newItem.id,
                //         ),
                // )
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
        // TODO: попробовать сделать оптимистик апдейт
        toggleDialogMute: build.mutation<DialogDto, ToggleDialogMuteParams>({
            query: ({ dialogId, userId }) => ({
                url: `/dialogs/${dialogId}/toggle-mute`,
                method: 'PATCH',
                body: { userId },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(rtkApi.util.invalidateTags(['Dialogs']))
                } catch (e) {
                    console.error(e)
                }
            },
        }),
    }),
})

export const useGetDialog = dialogApi.useGetDialogQuery
export const useToggleDialog = dialogApi.useToggleDialogMuteMutation
export const getDialog = dialogApi.endpoints.getDialog.initiate
