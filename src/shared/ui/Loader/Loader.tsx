import { FC } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './Loader.module.scss'

interface LoaderProps {
    className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => (
    <div className={cn(cls['loader-wrapper'], {}, [className])}>
        <div className={cn(cls['lds-ring'], {}, [className])}>
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
)
