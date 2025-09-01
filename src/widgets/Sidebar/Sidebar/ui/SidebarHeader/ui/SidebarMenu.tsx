import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon/Icon'
import MenuIcon from '@/shared/assets/icons/menu.svg'
import { Menu } from '@/shared/ui/Menu/Menu'
import { Text } from '@/shared/ui/Text/Text'
import cls from './SidebarHeader.module.scss'

export const SidebarMenu = memo(() => {
    const { t } = useTranslation()

    const items = useMemo(() => {
        return [
            {
                content: t('Создать'),
                submenu: [
                    {
                        content: (
                            <div className={cls.submenu}>
                                <Text
                                    text="Группа"
                                    label="Переписка с друзьями"
                                />
                            </div>
                        ),
                    },
                    {
                        content: (
                            <div className={cls.submenu}>
                                <Text text="Канал" label="Рассылка сообщений" />
                            </div>
                        ),
                    },
                    {
                        content: (
                            <div className={cls.submenu}>
                                <Text
                                    text="Папка"
                                    label="Удобная организация чатов"
                                />
                            </div>
                        ),
                    },
                ],
            },
            {
                content: t('Настройки'),
                href: '#settings',
            },
        ]
    }, [t])

    return (
        <Menu
            trigger={<Icon Svg={MenuIcon} clickable onClick={() => {}} />}
            items={items}
        />
    )
})
