import {
    FC,
    memo,
    NamedExoticComponent,
    useCallback,
    useRef,
    useState,
} from 'react'
import { Flex, FlexDirection } from '@/shared/ui/Stack/Flex/Flex'
import { cn } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card/Card'
import cls from './Tabs.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg'

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
        const tabsRef = useRef<HTMLDivElement | null>(null)
        const [showLeftArrow, setShowLeftArrow] = useState(false)
        const [showRightArrow, setShowRightArrow] = useState(false)

        const clickHandler = useCallback(
            (tab: TabItem) => {
                onClickTab(tab)

                if (tabsRef.current) {
                    const tabElement = tabsRef.current.querySelector(
                        `[data-tab-value="${tab.value}"]`,
                    ) as HTMLElement
                    if (tabElement) {
                        tabElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center',
                        })
                    }
                }
            },
            [onClickTab],
        )

        const checkScroll = useCallback(() => {
            if (tabsRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
                setShowLeftArrow(scrollLeft > 0)
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
            }
        }, [])

        const scrollLeft = useCallback(() => {
            if (tabsRef.current) {
                tabsRef.current.scrollBy({
                    left: -200,
                    behavior: 'smooth',
                })
            }
        }, [])

        const scrollRight = useCallback(() => {
            if (tabsRef.current) {
                tabsRef.current.scrollBy({
                    left: 200,
                    behavior: 'smooth',
                })
            }
        }, [])

        return (
            <div className={cn(cls.tabsContainer, {}, [className])}>
                {showLeftArrow && (
                    <Icon
                        Svg={ArrowLeftIcon}
                        onClick={scrollLeft}
                        className={cn(cls.scrollButton, {}, [
                            cls.scrollButtonLeft,
                        ])}
                    />
                )}
                <div
                    ref={tabsRef}
                    onScroll={checkScroll}
                    className={cn(cls.Tabs, {}, [])}
                >
                    <Flex
                        direction={direction}
                        gap="8"
                        className={cls.tabsInner}
                    >
                        {items.map((tab) => (
                            <Card
                                border="round"
                                key={tab.value}
                                onClick={() => clickHandler(tab)}
                                className={cls.tab}
                                variant={
                                    tab.value === value ? 'light' : 'normal'
                                }
                                data-tab-value={tab.value}
                            >
                                {tab.title}
                                {Boolean(tab.unreadCount) && (
                                    <div
                                        className={cn(cls.unreadCount, {
                                            [cls.activeTab]:
                                                tab.value === value,
                                        })}
                                    >
                                        {tab.unreadCount}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </Flex>
                </div>

                {showRightArrow && (
                    <Icon
                        Svg={ArrowRightIcon}
                        onClick={scrollRight}
                        className={cn(cls.scrollButton, {}, [
                            cls.scrollButtonRight,
                        ])}
                    />
                )}
            </div>
        )
    },
) as NamedExoticComponent<TabsProps>
Tabs.displayName = 'Tabs'
