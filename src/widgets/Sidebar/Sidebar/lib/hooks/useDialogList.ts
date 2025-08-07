import { useCallback, useState } from 'react'

interface ReturnUseDialogLis {
    openedMenuId?: string | null
    menuPosition: {
        x: number
        y: number
    }
    handleContextMenu: (e: React.MouseEvent, dialogId: string) => void
    handleCloseMenu: () => void
}

export const useDialogList = (): ReturnUseDialogLis => {
    const [openedMenuId, setOpenedMenuId] = useState<string | null>()
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

    const handleContextMenu = useCallback(
        (e: React.MouseEvent, dialogId: string) => {
            e.preventDefault()
            setMenuPosition({ x: e.clientX, y: e.clientY })
            setOpenedMenuId(dialogId)
        },
        [],
    )

    const handleCloseMenu = useCallback(() => {
        setOpenedMenuId(null)
    }, [])

    return { openedMenuId, menuPosition, handleContextMenu, handleCloseMenu }
}
