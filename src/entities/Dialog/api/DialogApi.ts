import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'
import { rtkApi } from '@/shared/api/rtkApi'

interface getDialogProps {
    userId: string
    limit?: number
    page?: number
    folder?: string
}

// TODO: сделать прерывание запроса

const dialiogApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDialog: build.query<DialogDto, getDialogProps>({
            query: ({ userId, limit = 10, page = 1, folder }) => ({
                url: '/dialogs',
                method: 'GET',
                params: {
                    userId,
                    _limit: limit,
                    _page: page,
                    _sort: 'lastMessage.timestamp',
                    folder: folder !== 'all' ? folder : undefined,
                },
            }),
            serializeQueryArgs: ({ queryArgs }) => {
                return `${queryArgs.userId}-${queryArgs.folder || 'all'}`
            },
            merge: (currentCache, newItems) => {
                if (newItems.currentPage === 1) {
                    return {
                        data: newItems.data,
                        currentPage: newItems.currentPage,
                        totalItems: newItems.totalItems,
                        totalPages: newItems.totalPages,
                    }
                }
                return {
                    data: [...currentCache.data, ...newItems.data],
                    currentPage: newItems.currentPage,
                    totalItems: newItems.totalItems,
                    totalPages: newItems.totalPages,
                }
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return (
                    currentArg?.page !== previousArg?.page ||
                    currentArg?.folder !== previousArg?.folder
                )
            },
        }),
    }),
})

export const useGetDialog = dialiogApi.useGetDialogQuery
