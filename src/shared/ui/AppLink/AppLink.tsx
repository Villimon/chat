import {
    ForwardedRef,
    forwardRef,
    memo,
    NamedExoticComponent,
    ReactNode,
} from 'react'
import { LinkProps, NavLink } from 'react-router-dom'
import { cn } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'secondary'

interface AppLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    variant?: AppLinkVariant
    activeClassName?: string
}

export const AppLink = memo(
    forwardRef(
        (
            {
                children,
                to,
                className,
                variant = 'primary',
                activeClassName = '',
                ...otherProps
            }: AppLinkProps,
            ref: ForwardedRef<HTMLAnchorElement>,
        ) => (
            <NavLink
                ref={ref}
                to={to}
                {...otherProps}
                className={({ isActive }) =>
                    cn(cls.AppLink, { [activeClassName]: isActive }, [
                        className,
                        cls[variant],
                    ])}
            >
                {children}
            </NavLink>
        ),
    ),
) as NamedExoticComponent<AppLinkProps>
AppLink.displayName = 'AppLink'
