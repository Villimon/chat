import { FC, memo } from 'react'
import { Icon } from '@/shared/ui/Icon/Icon'
import LeftArrowIcon from '@/shared/assets/icons/arrow-left.svg'
import cls from './NavigateBack.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { cn } from '@/shared/lib/classNames/classNames'
import { useNavigateBack } from '../lib/hooks/useNavigateBack'
import { Text } from '@/shared/ui/Text/Text'

interface NavigateBackProps {
    hash?: string
    className?: string
}

export const NavigateBack: FC<NavigateBackProps> = memo(
    ({ className, hash }) => {
        const cleanUrl = useNavigateBack({ hash })

        return (
            <AppLink to={cleanUrl} className={cn(cls.link, {}, [className])}>
                <Icon Svg={LeftArrowIcon} />
                <Text text="Назад" />
            </AppLink>
        )
    },
)
