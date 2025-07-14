import { FC, Fragment, memo, ReactNode } from 'react'
import { Menu as HMenu } from '@headlessui/react'
import cls from './menu.module.scss'
import popupCls from './popup.module.scss'
import { DropdawnDirection } from '@/shared/types/ui'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { cn } from '@/shared/lib/classNames/classNames'

export interface MenuItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

interface MenuProps {
    className?: string
    items: MenuItem[]
    trigger: ReactNode
    direction?: DropdawnDirection
}

export const Menu: FC<MenuProps> = memo(
    ({ className, items, trigger, direction = 'bottom-right' }) => (
        <HMenu
            as="div"
            className={cn(cls.Menu, {}, [className, popupCls.popup])}
        >
            <HMenu.Button className={popupCls.trigger}>{trigger}</HMenu.Button>
            <HMenu.Items
                className={cn(cls.menu, {}, [cls[direction], popupCls.menu])}
            >
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            key={index}
                            onClick={item.onClick}
                            className={cn(
                                cls.item,
                                { [popupCls.active]: active },
                                [],
                            )}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            <HMenu.Item
                                key={index}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </HMenu.Item>
                        )
                    }

                    return (
                        <HMenu.Item
                            key={index}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </HMenu.Item>
                    )
                })}
            </HMenu.Items>
        </HMenu>
    ),
)
