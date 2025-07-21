import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'
import { rtkApi } from '@/shared/api/rtkApi'

interface getDialogProps {
    userId: string
    limit?: number
    page?: number
}

const dialiogApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDialog: build.query<DialogDto, getDialogProps>({
            query: ({ userId, limit = 10, page = 1 }) => ({
                url: '/dialogs',
                method: 'GET',
                params: {
                    userId,
                    _limit: limit,
                    _page: page,
                    _sort: 'lastMessage.timestamp',
                },
            }),
            serializeQueryArgs: ({ queryArgs }) => {
                return queryArgs.userId
            },
            merge: (currentCache, newItems) => {
                return {
                    data: [...currentCache.data, ...newItems.data],
                    currentPage: newItems.currentPage,
                    totalItems: newItems.totalItems,
                    totalPages: newItems.totalPages,
                }
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page
            },
        }),
    }),
})

export const useGetDialog = dialiogApi.useGetDialogQuery
