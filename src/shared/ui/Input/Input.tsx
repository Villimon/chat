import {
    InputHTMLAttributes,
    memo,
    NamedExoticComponent,
    useEffect,
    useRef,
    useState,
} from 'react'
import cls from './Input.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { cn, Mode } from '@/shared/lib/classNames/classNames'
import { FlexDirection } from '@/shared/ui/Stack/Flex/Flex'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readonly'
>

interface InputProps extends HTMLInputProps {
    className?: string
    label?: string
    value?: string
    onChange?: (value: string) => void
    type?: string
    placeholder?: string
    error?: string
    autofocus?: boolean
    readonly?: boolean
    wrapperHidden?: boolean
    direction?: FlexDirection
}

// TODO  сделать валидацию
export const Input = memo(
    ({
        label,
        value,
        onChange,
        placeholder,
        type,
        readonly,
        autofocus,
        className,
        direction = 'column',
        disabled,
        error,
        ...otherProps
    }: InputProps) => {
        const [isFocused, setIsFocused] = useState(false)
        const ref = useRef<HTMLInputElement>(null)

        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value)
        }

        useEffect(() => {
            if (autofocus) {
                ref.current?.focus()
                setIsFocused(true)
            }
        }, [autofocus])

        const onFocus = () => {
            if (!readonly) {
                setIsFocused(true)
            }
        }

        const onBlur = () => {
            setIsFocused(false)
        }

        const mods: Mode = {
            [cls.readonly]: readonly,
            [cls.focused]: isFocused,
        }

        return (
            <VStack gap="4" max>
                {label && <Text text={label} />}
                <div className={cn(cls.InputWrapper, mods, [className])}>
                    <input
                        value={value}
                        onChange={onChangeHandler}
                        className={cls.input}
                        placeholder={placeholder}
                        ref={ref}
                        type={type}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        readOnly={readonly}
                        disabled={disabled}
                        {...otherProps}
                    />
                </div>
                {error && <Text variant="error" text={error} />}
            </VStack>
        )
    },
) as NamedExoticComponent<InputProps>
Input.displayName = 'Input'
