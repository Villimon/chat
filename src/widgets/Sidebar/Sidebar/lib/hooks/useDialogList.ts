import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { DialogDto } from '@/entities/Dialog/model/types/dialogSchema'
import { getActiveFolder } from '../../model/selectors/getActiveFolder/getActiveFolder'

interface ReturnUseDialogLis {
    openedMenuId?: string | null
    menuPosition: {
        x: number
        y: number
    }
    handleContextMenu: (e: React.MouseEvent, dialogId: string) => void
    handleCloseMenu: () => void
    getNextOrder: () => number
}

interface UseDialogListProps {
    dialogs: DialogDto | undefined
}

export const useDialogList = ({
    dialogs,
}: UseDialogListProps): ReturnUseDialogLis => {
    // Вынести всю логику по контекстному меню в хук useContextMenu и использовать хук тут
    const [openedMenuId, setOpenedMenuId] = useState<string | null>()
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const activeFolder = useSelector(getActiveFolder)

    /*
    export const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState<Dialog | Folder | Message>();

  const openMenu = (event: React.MouseEvent, menuTarget: any) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setTarget(menuTarget);
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  return { isOpen, position, target, openMenu, closeMenu };
};

    */

    const handleContextMenu = useCallback(
        (e: React.MouseEvent, dialogId: string) => {
            e.preventDefault()
            setMenuPosition({ x: e.clientX, y: e.clientY })
            setOpenedMenuId(dialogId)
        },
        [],
    )

    const getNextOrder = useCallback(() => {
        const maxOrder = dialogs?.data.reduce((max, dialog) => {
            const order = dialog.userSettings?.pinned?.[activeFolder.value]?.order || 0
            return Math.max(max, order)
        }, 0)

        if (!maxOrder) return 1

        return maxOrder + 1
    }, [dialogs?.data, activeFolder])

    const handleCloseMenu = useCallback(() => {
        setOpenedMenuId(null)
    }, [])

    return {
        openedMenuId,
        menuPosition,
        handleContextMenu,
        handleCloseMenu,
        getNextOrder,
    }
}
