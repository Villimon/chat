import { CSSProperties, FC, memo, useMemo } from 'react'
import cls from './Avatar.module.scss'
import { Skeleton } from '../Skeleton'
import { cn } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/AppImage/AppImage'
import { Text } from '@/shared/ui/Text/Text'

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
    initials?: string
}

export const Avatar: FC<AvatarProps> = memo(
    ({ src, className, size = 100, alt, initials }) => {
        const styles = useMemo<CSSProperties>(
            () => ({
                width: size,
                height: size,
            }),
            [size],
        )

        const errorFallback = <Text className={cls.avatar} text={initials} />
        // const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />
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
