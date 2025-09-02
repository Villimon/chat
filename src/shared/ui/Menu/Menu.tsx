import { FC, Fragment, memo, ReactNode, useState } from 'react'
import { Menu as HMenu } from '@headlessui/react'
import cls from './Menu.module.scss'
import popupCls from './Popup.module.scss'
import { DropdawnDirection } from '@/shared/types/ui'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { cn } from '@/shared/lib/classNames/classNames'

export interface SubmenuItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

export interface MenuItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
    submenu?: SubmenuItem[]
}

interface MenuProps {
    className?: string
    items: MenuItem[]
    trigger: ReactNode
    direction?: DropdawnDirection
}

export const Menu: FC<MenuProps> = memo(({ className, items, trigger, direction = 'bottom-right' }) => {
    const [hoveredSubmenuIndex, setHoveredSubmenuIndex] = useState<number | null>(null)

    return (
        <HMenu
            as="div"
            className={cn(cls.Menu, {}, [className, popupCls.popup])}
        >
            <HMenu.Button className={popupCls.trigger}>{trigger}</HMenu.Button>
            <HMenu.Items
                className={cn(cls.menu, {}, [cls[direction], popupCls.menu])}
                onMouseLeave={() => setHoveredSubmenuIndex(null)}
            >
                {items.map((item, index) => {
                    if (item.submenu) {
                        return (
                            <HMenu.Item
                                key={index}
                                as="div"
                                disabled={item.disabled}
                            >
                                {({ active }) => (
                                    <div
                                        className={cls.submenuContainer}
                                        onMouseEnter={() => setHoveredSubmenuIndex(index)}
                                        onMouseLeave={(e) => {
                                            const relatedTarget = e.relatedTarget as HTMLElement
                                            if (!relatedTarget?.closest?.(`.${cls.submenu}`)) {
                                                setHoveredSubmenuIndex(null)
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={item.onClick}
                                            className={cn(
                                                cls.item,
                                                {
                                                    [popupCls.active]: active || hoveredSubmenuIndex === index,
                                                },
                                                [],
                                            )}
                                            disabled={item.disabled}
                                        >
                                            {item.content}
                                            {item.submenu && (
                                                <span className={cls.arrow}>
                                                    &#8250;
                                                </span>
                                            )}
                                        </button>

                                        {/* Вложенное меню */}
                                        {(active || hoveredSubmenuIndex === index) && item.submenu && (
                                            <div
                                                className={cn(
                                                    cls.submenu,
                                                    {},
                                                    [
                                                        cls[
                                                            `${direction}-submenu`
                                                        ],
                                                    ],
                                                )}
                                                onMouseEnter={() => setHoveredSubmenuIndex(index)}
                                                onMouseLeave={() => setHoveredSubmenuIndex(null)}
                                            >
                                                {item.submenu.map(
                                                    (subItem, subIndex) => {
                                                        const subContent = ({ active: subActive }: {active: boolean}) => (
                                                            <button
                                                                type="button"
                                                                key={subIndex}
                                                                onClick={subItem.onClick}
                                                                className={cn(
                                                                    cls.subItem,
                                                                    { [popupCls.active]: subActive },
                                                                    [],
                                                                )}
                                                                disabled={subItem.disabled}
                                                            >
                                                                {subItem.content}
                                                            </button>
                                                        )

                                                        if (subItem.href) {
                                                            return (
                                                                <HMenu.Item
                                                                    key={subIndex}
                                                                    as={AppLink}
                                                                    to={subItem.href}
                                                                    disabled={subItem.disabled}
                                                                >
                                                                    {subContent}
                                                                </HMenu.Item>
                                                            )
                                                        }

                                                        return (
                                                            <HMenu.Item
                                                                key={subIndex}
                                                                as={Fragment}
                                                                disabled={subItem.disabled}
                                                            >
                                                                {subContent}
                                                            </HMenu.Item>
                                                        )
                                                    },
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </HMenu.Item>
                        )
                    }

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
    )
})
