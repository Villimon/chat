import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon/Icon'
import MenuIcon from '@/shared/assets/icons/menu.svg'
import { Menu } from '@/shared/ui/Menu/Menu'

export const SidebarMenu = memo(() => {
    const { t } = useTranslation()

    const items = useMemo(() => {
        return [
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
