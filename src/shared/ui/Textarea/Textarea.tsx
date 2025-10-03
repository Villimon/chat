import {
    memo,
    NamedExoticComponent,
    RefObject,
    TextareaHTMLAttributes,
} from 'react'
import cls from './Textarea.module.scss'

type HTMLTextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readonly'
>

interface TextareaProps extends HTMLTextAreaProps {
    className?: string
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    error?: string
    ref?: RefObject<HTMLTextAreaElement | null>
}

export const Textarea = memo(
    ({
        value,
        onChange,
        placeholder,
        className,
        disabled,
        error,
        ref,
        ...otherProps
    }: TextareaProps) => {
        const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange?.(e.target.value)
        }

        return (
            <textarea
                name="textarea"
                value={value}
                onChange={onChangeHandler}
                className={cls.textarea}
                placeholder={placeholder}
                ref={ref}
                disabled={disabled}
                {...otherProps}
            />
        )
    },
) as NamedExoticComponent<TextareaProps>
Textarea.displayName = 'Textarea'
