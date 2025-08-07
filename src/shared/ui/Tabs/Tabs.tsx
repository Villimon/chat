import { FC, memo, NamedExoticComponent, useCallback } from 'react'
import { Flex, FlexDirection } from '@/shared/ui/Stack/Flex/Flex'
import { cn } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card/Card'
import cls from './Tabs.module.scss'

export interface TabItem {
    value: string
    title: string
    unreadCount?: number
}

interface TabsProps {
    value: string
    items: TabItem[]
    onClickTab: (tab: TabItem) => void
    direction?: FlexDirection
    className?: string
}

export const Tabs: FC<TabsProps> = memo(
    ({ items, onClickTab, value, className, direction = 'row' }) => {
        const clickHandler = useCallback(
            (tab: TabItem) => {
                onClickTab(tab)
            },
            [onClickTab],
        )

        return (
            <Flex
                direction={direction}
                gap="8"
                className={cn(cls.Tabs, {}, [className])}
            >
                {items.map((tab) => (
                    <Card
                        border="round"
                        key={tab.value}
                        onClick={() => clickHandler(tab)}
                        className={cls.tab}
                        variant={tab.value === value ? 'light' : 'normal'}
                    >
                        {tab.title}
                        {tab.unreadCount && (
                            <div
                                className={cn(cls.unreadCount, {
                                    [cls.activeTab]: tab.value === value,
                                })}
                            >
                                {tab.unreadCount}
                            </div>
                        )}
                    </Card>
                ))}
            </Flex>
        )
    },
) as NamedExoticComponent<TabsProps>
Tabs.displayName = 'Tabs'
