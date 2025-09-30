import { useCallback, useState } from 'react'
import { CreateFolder } from '@/features/CreateFolder'
import FolderPlusIcon from '@/shared/assets/icons/folder-plus.svg'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon/Icon'

export const CreateFolderButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const onCloseHandler = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onOpenHandler = useCallback(() => {
        setIsOpen(true)
    }, [])

    return (
        <div>
            <Button
                onClick={onOpenHandler}
                addonLeft={<Icon Svg={FolderPlusIcon} />}
                variant="clear"
            >
                Новая папка
            </Button>
            {isOpen && (
                <CreateFolder isOpen={isOpen} onClose={onCloseHandler} />
            )}
        </div>
    )
}
