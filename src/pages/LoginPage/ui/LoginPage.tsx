import { memo } from 'react'
import cls from './LoginPage.module.scss'
import { LoginForm } from '@/features/AuthByUsername'

const LoginPage = memo(() => (
    <main className={cls.container}>
        <LoginForm />
    </main>
))

export default LoginPage
