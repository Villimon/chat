import { HTMLAttributes, memo, NamedExoticComponent, ReactNode } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export type CardVariant = 'normal' | 'outline' | 'light'
export type CardPadding = '0' | '8' | '16' | '24'
export type CardBorder = 'round' | 'standart' | 'partial'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    fullWidth?: boolean
    border?: CardBorder
    padding?: CardPadding
    variant?: CardVariant
}

const mapPaddingToClass: Record<CardPadding, string> = {
    0: 'gap_0',
    8: 'gap_8',
    16: 'gap_16',
    24: 'gap_24',
}

export const Card = memo(
    ({
        className,
        children,
        fullWidth,
        border = 'standart',
        padding = '8',
        variant = 'normal',
        ...otherProps
    }: CardProps) => {
        return (
            <div
                {...otherProps}
                className={cn(cls.Card, { [cls.fullWidth]: fullWidth }, [
                    className,
                    cls[border],
                    cls[variant],
                    cls[mapPaddingToClass[padding]],
                ])}
            >
                {children}
            </div>
        )
    },
) as NamedExoticComponent<CardProps>

Card.displayName = 'Card'
