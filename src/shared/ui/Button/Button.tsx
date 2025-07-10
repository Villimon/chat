import {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef,
    memo,
    NamedExoticComponent,
    ReactNode,
} from 'react'
import cls from './Button.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonColor = 'normal' | 'success' | 'error'
export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    /**
     * Тема кнопки
     */
    variant?: ButtonVariant
    /**
     * Квадратная кнопка
     */
    square?: boolean
    /**
     * Размер кнопки
     */
    size?: ButtonSize
    /**
     * Кликабельность кнопки
     */
    disabled?: boolean
    children: ReactNode
    /**
     * На всю ширину кнопка
     */
    fullWidth?: boolean
    /**
     * Дополнительная нода слева в кнопке (иконка)
     */
    addonLeft?: ReactNode
    /**
     * Дополнительная нода справа в кнопке (иконка)
     */
    addonRight?: ReactNode
    /**
     * Цвет кнопки
     */
    color?: ButtonColor
}

export const Button = memo(
    forwardRef(
        (
            {
                className,
                children,
                variant = 'outline',
                square,
                disabled,
                size = 'm',
                fullWidth,
                addonLeft,
                addonRight,
                color = 'normal',
                ...otherProps
            }: ButtonProps,
            ref: ForwardedRef<HTMLButtonElement>,
        ) => (
            <button
                ref={ref}
                type="button"
                {...otherProps}
                disabled={disabled}
                className={cn(
                    cls.Button,
                    {
                        [cls.square]: square,
                        [cls.disabled]: disabled,
                        [cls.fullWidth]: fullWidth,
                        [cls.withAddon]:
                            Boolean(addonLeft) || Boolean(addonRight),
                    },
                    [className, cls[variant], cls[size], cls[color]],
                )}
            >
                {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
                {children}
                {addonRight && (
                    <div className={cls.addonRight}>{addonRight}</div>
                )}
            </button>
        ),
    ),
) as NamedExoticComponent<ButtonProps>

Button.displayName = 'Button'
