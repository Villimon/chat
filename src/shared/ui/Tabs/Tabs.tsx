import {
    FC,
    JSX,
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
    onContextMenu?: (e: React.MouseEvent, targetId: string) => void
    openedMenuId?: string | null
    isContextmenu?: boolean
    contextmenu?: (tab: TabItem) => JSX.Element
    isDefaultFolderType?: boolean
}

export const Tabs: FC<TabsProps> = memo(
    ({
        items,
        onClickTab,
        value,
        className,
        direction = 'row',
        onContextMenu,
        openedMenuId,
        isContextmenu = false,
        contextmenu,
        isDefaultFolderType,
    }) => {
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
            <div
                className={cn(
                    cls.tabsContainer,
                    { [cls.tabsContainerPanelLeft]: !isDefaultFolderType },
                    [className],
                )}
            >
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
                    className={cn(
                        cls.Tabs,
                        { [cls.TabsPanelLeft]: !isDefaultFolderType },
                        [],
                    )}
                >
                    <Flex
                        direction={direction}
                        gap={isDefaultFolderType ? '8' : '16'}
                        className={cls.tabsInner}
                    >
                        {items.map((tab) => (
                            <>
                                <Card
                                    border="partial"
                                    key={tab.value}
                                    onClick={() => clickHandler(tab)}
                                    className={cn(
                                        cls.tab,
                                        {
                                            [cls.tabPanelLeft]:
                                                !isDefaultFolderType,
                                        },
                                        [],
                                    )}
                                    variant={
                                        tab.value === value ? 'light' : 'normal'
                                    }
                                    data-tab-value={tab.value}
                                    onContextMenu={
                                        isContextmenu
                                            ? (e) =>
                                                onContextMenu?.(e, tab.value)
                                            : undefined
                                    }
                                >
                                    {tab.title}
                                    {Boolean(tab.unreadCount) && (
                                        <div
                                            className={cn(cls.unreadCount, {
                                                [cls.unreadCountPanelLeft]:
                                                    !isDefaultFolderType,
                                                [cls.activeTab]:
                                                    tab.value === value,
                                            })}
                                        >
                                            {tab.unreadCount}
                                        </div>
                                    )}
                                </Card>
                                {openedMenuId === `${tab.value}-folder`
                                    && isContextmenu
                                    && contextmenu?.(tab)}
                            </>
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
