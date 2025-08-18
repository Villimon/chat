import { FC, ReactNode, useCallback } from 'react'
import { Overlay } from '@/shared/ui/Overlay'
import { Portal } from '@/shared/ui/Portal/Portal'
import cls from './Modal.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'

interface ModalProps {
    className?: string
    children: ReactNode
    isOpen: boolean
    onClose: () => void
}

export const Modal: FC<ModalProps> = ({
    className,
    children,
    isOpen,
    onClose,
}) => {
    const closeHandler = useCallback(() => {
        onClose()
    }, [onClose])

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                id="modal"
                className={cn(cls.modal, { [cls.opened]: isOpen }, [className])}
            >
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
}
