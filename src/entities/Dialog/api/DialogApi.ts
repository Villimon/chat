import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'
import { rtkApi } from '@/shared/api/rtkApi'

interface GetDialogProps {
    userId: string
    limit?: number
    page?: number
    folder?: string
    query?: string
}

// TODO: сделать прерывание запроса
// TODO: проблема в том, что нет кеша по стараницам(если есть появляются свои проблемы с отрисовкой данных), от сюда проблема в том, что данные запрашиваются по новому а не берутся с кеша, если менялось page
const dialiogApi = rtkApi.injectEndpoints({
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
            serializeQueryArgs: ({ queryArgs }) => {
                return `${queryArgs.folder || 'all'}-${queryArgs.query || ''}`
            },
            merge: (currentCache, newItems, { arg }) => {
                if (newItems.currentPage === 1 || arg.query) {
                    return {
                        data: newItems.data,
                        currentPage: newItems.currentPage,
                        totalItems: newItems.totalItems,
                        totalPages: newItems.totalPages,
                    }
                }

                const newData = newItems.data.filter(
                    (newItem) =>
                        !currentCache.data.some(
                            (cachedItem) => cachedItem.id === newItem.id,
                        ),
                )

                return {
                    data: [...currentCache.data, ...newData],
                    currentPage: newItems.currentPage,
                    totalItems: newItems.totalItems,
                    totalPages: newItems.totalPages,
                }
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page
            },
            keepUnusedDataFor: 60 * 5,
        }),
    }),
})

export const useGetDialog = dialiogApi.useGetDialogQuery
