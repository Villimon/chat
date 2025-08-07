import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useDialogFetching } from '../../api/useDialogFetching'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { getPage } from '../../../Sidebar/model/selectors/getPage/getPage'
import { sidebarActions } from '../../../Sidebar/model/slice/sidebar'
import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'

interface ReturnUseDialogListData {
    dialogs?: DialogDto
    isError: boolean
    isFetching: boolean
    isSuccess: boolean
    loadMore: () => void
}

export const useDialogListData = (): ReturnUseDialogListData => {
    const page = useSelector(getPage)
    const dispatch = useAppDispatch()

    const {
        data: dialogs,
        isError,
        isFetching,
        isSuccess,
    } = useDialogFetching()

    const loadMore = useCallback(() => {
        if (!isFetching && dialogs && page < dialogs?.totalPages) {
            dispatch(sidebarActions.setPage(1))
        }
    }, [isFetching, dialogs, page, dispatch])

    return {
        dialogs,
        isError,
        isFetching,
        isSuccess,
        loadMore,
    }
}
