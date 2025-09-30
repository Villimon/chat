import { ReactNode } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Flex.module.scss'

export type FlexAlign = 'center' | 'start' | 'end'
export type FlexJustify = 'center' | 'start' | 'end' | 'between'
export type FlexDirection = 'row' | 'column' | 'row-reverse'
export type FlexWrap = 'nowrap' | 'wrap'
export type FlexGap = '4' | '8' | '16' | '24' | '32'

type DivType = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>

export interface FlexType extends DivType {
    children?: ReactNode
    align?: FlexAlign
    justify?: FlexJustify
    direction?: FlexDirection
    wrap?: FlexWrap
    gap?: FlexGap
    max?: boolean
    className?: string
}

const justifyClasses: Record<FlexJustify, string> = {
    between: cls.justifyBetween,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    start: cls.justifyStart,
}

const alignClasses: Record<FlexAlign, string> = {
    center: cls.alignCenter,
    end: cls.alignEnd,
    start: cls.alignStart,
}

const directionClasses: Record<FlexDirection, string> = {
    column: cls.directionColumn,
    row: cls.directionRow,
    'row-reverse': cls.directionRowReverse,
}

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
}

export const Flex = ({
    children,
    align = 'center',
    justify = 'start',
    direction = 'row',
    wrap = 'nowrap',
    gap,
    max,
    className,
    ...props
}: FlexType) => {
    const classes = [
        className,
        alignClasses[align],
        justifyClasses[justify],
        directionClasses[direction],
        gap && gapClasses[gap],
        cls[wrap],
    ]

    return (
        <div className={cn(cls.Flex, { [cls.max]: max }, classes)} {...props}>
            {children}
        </div>
    )
}
