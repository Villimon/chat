import { FC, memo } from 'react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal/Modal'

interface DeleteModalProps {
    onClick: () => void
    onClose: () => void
    leaveDialog: () => void
    deleteDialog: () => void
    className?: string
    isOpen: boolean
}

export const DeleteModal: FC<DeleteModalProps> = memo(
    ({ onClick, className, isOpen, onClose, deleteDialog, leaveDialog }) => {
        return (
            <>
                <Button
                    color="error"
                    variant="clear"
                    type="button"
                    className={cn('', {}, [className])}
                    onClick={onClick}
                    fullWidth
                >
                    Удалить чат
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <Button onClick={deleteDialog} style={{ marginBottom: 10 }}>
                        Удалить чат у всех
                    </Button>
                    <Button onClick={leaveDialog}>
                        Удалить чат только у меня
                    </Button>
                </Modal>
            </>
        )
    },
)
