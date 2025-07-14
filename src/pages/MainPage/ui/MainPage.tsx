import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './MainPage.module.scss'

export const MainPage = memo(() => {
    const { t } = useTranslation('')

    return (
        <main className={cls.container}>
            {t('Информация на главной странице')}
        </main>
    )
})
