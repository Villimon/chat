import { memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Text.module.scss'

type VariantType = 'primary' | 'secondary' | 'error' | 'accent'
type SizeType = 's' | 'm' | 'xl'
type AlignType = 'center' | 'left' | 'right'
type HeaderTagType = 'h1' | 'h2' | 'h3'

interface TextProps {
    title?: string
    text?: string
    label?: string
    className?: string
    size?: SizeType
    bold?: boolean
    variant?: VariantType
    align?: AlignType
}

const mapSizeToHeaderTag: Record<SizeType, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    xl: 'h3',
}

// TODO: приходят стили не в том виде в котором ожидается (ож: size_s, факт: sizeS)
const mapSizeToStyle: Record<SizeType, string> = {
    s: cls.sizeS,
    m: cls.sizeM,
    xl: cls.sizeL,
}

export const Text = memo(
    ({
        title,
        text,
        label,
        className,
        size = 'm',
        bold,
        variant = 'primary',
        align = 'left',
    }: TextProps) => {
        const HeaderTag = mapSizeToHeaderTag[size]

        return (
            <div
                className={cn(cls.text, { [cls.bold]: bold }, [
                    className,
                    cls[variant],
                    cls[align],
                    mapSizeToStyle[size],
                ])}
            >
                {title && (
                    <HeaderTag className={cn(cls.title, {}, [])}>
                        {title}
                    </HeaderTag>
                )}
                {text && <p className={cn(cls.parag, {}, [])}>{text}</p>}
                {label && <p className={cn(cls.label, {}, [])}>{label}</p>}
            </div>
        )
    },
)
