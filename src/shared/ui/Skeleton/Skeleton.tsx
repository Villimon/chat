import { CSSProperties, FC, memo } from 'react'
import cls from './Skeleton.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'

interface SkeletonProps {
    className?: string
    height?: string | number
    width?: string | number
    border?: string
}

export const Skeleton: FC<SkeletonProps> = memo(
    ({ className, border, height, width }) => {
        const style: CSSProperties = {
            width,
            height,
            borderRadius: border,
        }

        return (
            <div style={style} className={cn(cls.Skeleton, {}, [className])} />
        )
    },
)
