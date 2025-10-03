import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import Airplane from '@/shared/assets/icons/airplane.svg'
import ClipIcon from '@/shared/assets/icons/clip.svg'
import FaceSmileIcon from '@/shared/assets/icons/face-smile.svg'
import { Icon } from '@/shared/ui/Icon/Icon'

interface FooterChatProps {
    className?: string
}

export const FooterChat: FC<FooterChatProps> = memo(({ className }) => {
    const [value, setValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)
    const footerPaddingRef = useRef(0)

    // Константы высот
    const MIN_TEXTAREA_HEIGHT = 24 // Минимальная высота (1 строка)
    const MIN_FOOTER_HEIGHT = 40
    const MAX_FOOTER_HEIGHT = 300

    useEffect(() => {
        const footer = footerRef.current
        if (footer) {
            const styles = window.getComputedStyle(footer)
            const paddingTop = parseFloat(styles.paddingTop) || 0
            const paddingBottom = parseFloat(styles.paddingBottom) || 0
            footerPaddingRef.current = paddingTop + paddingBottom

            // Устанавливаем начальную высоту
            footer.style.height = `${MIN_FOOTER_HEIGHT}px`
        }

        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = `${MIN_TEXTAREA_HEIGHT}px`
        }
    }, [])

    const calculateTextHeight = () => {
        const textarea = textareaRef.current
        if (!textarea) return MIN_TEXTAREA_HEIGHT

        // Создаем невидимый элемент для точного расчета
        const hiddenDiv = document.createElement('div')
        const styles = window.getComputedStyle(textarea)

        hiddenDiv.style.width = `${textarea.clientWidth}px`
        hiddenDiv.style.font = styles.font
        hiddenDiv.style.lineHeight = styles.lineHeight
        hiddenDiv.style.padding = styles.padding
        hiddenDiv.style.border = styles.border
        hiddenDiv.style.boxSizing = styles.boxSizing
        hiddenDiv.style.whiteSpace = 'pre-wrap'
        hiddenDiv.style.wordWrap = 'break-word'
        hiddenDiv.style.visibility = 'hidden'
        hiddenDiv.style.position = 'absolute'
        hiddenDiv.style.left = '-9999px'

        // Учитываем значение textarea
        hiddenDiv.textContent = `${textarea.value}\n` // Добавляем \n для последней строки

        document.body.appendChild(hiddenDiv)
        const height = hiddenDiv.scrollHeight
        document.body.removeChild(hiddenDiv)

        return Math.max(height, MIN_TEXTAREA_HEIGHT)
    }

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current
        const footer = footerRef.current
        if (!textarea || !footer) return

        const newTextareaHeight = calculateTextHeight()
        const maxTextareaHeight = MAX_FOOTER_HEIGHT - footerPaddingRef.current

        let finalTextareaHeight = newTextareaHeight
        let overflowY = 'hidden'

        if (newTextareaHeight > maxTextareaHeight) {
            finalTextareaHeight = maxTextareaHeight
            overflowY = 'auto'
        }

        textarea.style.height = `${finalTextareaHeight}px`
        textarea.style.overflowY = overflowY

        // Обновляем высоту футера
        const newFooterHeight = finalTextareaHeight + footerPaddingRef.current
        const finalFooterHeight = Math.max(
            MIN_FOOTER_HEIGHT,
            Math.min(MAX_FOOTER_HEIGHT, newFooterHeight),
        )

        footer.style.height = `${finalFooterHeight}px`
    }

    useEffect(() => {
        adjustTextareaHeight()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const handleInputChange = useCallback((value: string) => {
        setValue(value)
    }, [])

    return (
        <HStack gap="8" ref={footerRef} max className={cn('', {}, [className])}>
            {/* TODO: сделать загрузку файлов */}
            <Icon Svg={ClipIcon} clickable onClick={() => {}} />
            <Textarea
                ref={textareaRef}
                onChange={handleInputChange}
                value={value}
                placeholder="Сообщение"
                autoFocus
                rows={1}
            />
            {/* TODO: сделать возможность добавлять смайлики */}
            <Icon Svg={FaceSmileIcon} clickable onClick={() => {}} />
            <Icon
                Svg={Airplane}
                clickable
                onClick={() => {}}
                disabled={!value.trim()}
            />
        </HStack>
    )
})
