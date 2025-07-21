import { CSSProperties, FC, memo, useMemo } from 'react'
import cls from './Avatar.module.scss'
import UserIcon from '@/shared/assets/icons/user-icon.svg'
import { Skeleton } from '../Skeleton'
import { cn } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/AppImage/AppImage'
import { Icon } from '@/shared/ui/Icon/Icon'

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar: FC<AvatarProps> = memo(
    ({ src, className, size = 100, alt }) => {
        const styles = useMemo<CSSProperties>(
            () => ({
                width: size,
                height: size,
            }),
            [size],
        )

        const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />
        const fallback = <Skeleton width={size} height={size} border="50%" />

        return (
            <AppImage
                fallback={fallback}
                errorFallback={errorFallback}
                src={src}
                style={styles}
                className={cn(cls.Avatar, {}, [className])}
                alt={alt}
            />
        )
    },
)
