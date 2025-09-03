import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'
import { getActiveFolder } from '../../model/selectors/getActiveFolder/getActiveFolder'

interface ReturnUseDialogLis {
    getNextOrder: () => number
}

interface UseDialogListProps {
    dialogs: DialogDto | undefined
}

export const useDialogList = ({
    dialogs,
}: UseDialogListProps): ReturnUseDialogLis => {
    const activeFolder = useSelector(getActiveFolder)

    const getNextOrder = useCallback(() => {
        const maxOrder = dialogs?.data.reduce((max, dialog) => {
            const order = dialog.userSettings?.pinned?.[activeFolder.value]?.order || 0
            return Math.max(max, order)
        }, 0)

        if (!maxOrder) return 1

        return maxOrder + 1
    }, [dialogs?.data, activeFolder])

    return {
        getNextOrder,
    }
}
