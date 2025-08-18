import { FC, memo } from 'react'
import cls from './Overlay.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'

interface OverlayProps {
    className?: string
    onClick?: () => void
}

export const Overlay: FC<OverlayProps> = memo(({ className, onClick }) => (
    <div onClick={onClick} className={cn(cls.Overlay, {}, [className])} />
))
