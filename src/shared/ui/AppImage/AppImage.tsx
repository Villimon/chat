import {
    FC,
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    fallback?: ReactElement
    errorFallback?: ReactElement
}

export const AppImage: FC<AppImageProps> = memo(
    ({
        src,
        className,
        fallback,
        errorFallback,
        alt = 'image',
        ...otherProps
    }) => {
        const [isLoading, setIsLoading] = useState(true)
        const [hasError, setHasError] = useState(false)

        useLayoutEffect(() => {
            const img = new Image()
            img.src = src ?? ''
            img.onload = () => {
                setIsLoading(false)
            }
            img.onerror = () => {
                setHasError(true)
                setIsLoading(false)
            }
        }, [src])

        if (isLoading && fallback) {
            return fallback
        }

        if (hasError && errorFallback) {
            return errorFallback
        }

        return <img src={src} alt={alt} className={className} {...otherProps} />
    },
)
