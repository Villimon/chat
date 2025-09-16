import { FC, memo } from 'react'
import { Icon } from '@/shared/ui/Icon/Icon'
import LeftArrowIcon from '@/shared/assets/icons/arrow-left.svg'
import cls from './NavigateBack.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { cn } from '@/shared/lib/classNames/classNames'
import { useNavigateBack } from '../lib/hooks/useNavigateBack'

interface NavigateBackProps {
    hash?: string
    className?: string
}

export const NavigateBack: FC<NavigateBackProps> = memo(
    ({ className, hash }) => {
        const cleanUrl = useNavigateBack({ hash })

        return (
            <AppLink to={cleanUrl} className={cn('', {}, [className])}>
                <Icon className={cls.icon} Svg={LeftArrowIcon} />
            </AppLink>
        )
    },
)
