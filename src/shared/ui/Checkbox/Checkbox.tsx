import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import cls from './Checkbox.module.scss'
import { cn, Mode } from '@/shared/lib/classNames/classNames'
import { FlexDirection } from '@/shared/ui/Stack/Flex/Flex'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'

type HTMLCheckboxProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'readonly' | 'checked'
>

interface CheckboxProps extends HTMLCheckboxProps {
    className?: string
    label?: string
    onChange?: (value: boolean) => void
    placeholder?: string
    autofocus?: boolean
    readonly?: boolean
    wrapperHidden?: boolean
    checked?: boolean
    direction?: FlexDirection
}

export const Checkbox = memo(
    ({
        label,
        value,
        onChange,
        placeholder,
        readonly,
        autofocus,
        className,
        wrapperHidden = true,
        direction = 'column',
        disabled,
        checked,
        ...otherProps
    }: CheckboxProps) => {
        const [isFocused, setIsFocused] = useState(false)
        const ref = useRef<HTMLInputElement>(null)

        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.checked)
        }

        useEffect(() => {
            if (autofocus) {
                ref.current?.focus()
                setIsFocused(true)
            }
        }, [autofocus])

        const onFocus = () => {
            if (wrapperHidden) {
                setIsFocused(true)
            }
        }

        const onBlur = () => {
            if (wrapperHidden) {
                setIsFocused(false)
            }
        }

        const mods: Mode = {
            [cls.readonly]: readonly,
            [cls.focused]: isFocused,
            [cls.InputWrapper]: wrapperHidden,
        }

        const content = (
            <>
                {label && <label htmlFor="checkbox_id">{label}</label>}
                <div className={cn('', mods, [className])}>
                    <input
                        id="checkbox_id"
                        checked={checked}
                        onChange={onChangeHandler}
                        className={cls.input}
                        placeholder={placeholder}
                        ref={ref}
                        type="checkbox"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        readOnly={readonly}
                        disabled={disabled}
                        {...otherProps}
                    />
                </div>
            </>
        )

        return (
            <HStack direction="row-reverse" gap="4" max>
                {content}
            </HStack>
        )
    },
)
