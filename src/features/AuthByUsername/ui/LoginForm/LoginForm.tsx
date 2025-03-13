import { FC, memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { loginActions, loginReducer } from '../../model/slice/authSlice'
import { Input } from '@/shared/ui/Input/Input'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Card } from '@/shared/ui/Card/Card'
import { Button } from '@/shared/ui/Button'
import cls from './LoginForm.module.scss'
import { getUsername } from '../../model/selectors/getUsername/getUsername'
import { getPassword } from '../../model/selectors/getPassword/getPassword'
import { getRemember } from '../../model/selectors/getRemember/getRemember'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { useLoginMutation } from '../../api/authApi'
import { Text } from '@/shared/ui/Text/Text'
import { getUserData } from '@/entities/User'
import { getRouteMain } from '@/shared/constants/routes'

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

interface LoginFormProps {
    className?: string
}

export const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
    const [usernameValidation, setUsernameValidation] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState(false)
    const username = useSelector(getUsername)
    const password = useSelector(getPassword)
    const remember = useSelector(getRemember)
    const isAuth = useSelector(getUserData)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [login, { isError, isLoading }] = useLoginMutation()

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value))
        },
        [dispatch],
    )

    const onChangeRemember = useCallback(
        (value: boolean) => {
            dispatch(loginActions.setRemember(value))
        },
        [dispatch],
    )

    const loginHandler = useCallback(async () => {
        if (username.length <= 0) {
            setUsernameValidation(true)
        }
        if (password.length <= 0) {
            setPasswordValidation(true)
        }

        if (usernameValidation || passwordValidation) {
            return
        }

        await login({ password, remember, username })
    }, [
        login,
        password,
        passwordValidation,
        remember,
        username,
        usernameValidation,
    ])

    const onClickRegistrationButton = useCallback(() => {
        navigate('/registration')
    }, [navigate])

    if (isAuth) {
        return <Navigate to={getRouteMain()} />
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Card className={cls.card} padding="16">
                <VStack gap="16">
                    <VStack gap="8" max>
                        {/* TODO заюзать react-hook-form */}
                        <Input
                            label="Логин"
                            value={username}
                            autoFocus
                            placeholder="Логин"
                            onChange={onChangeUsername}
                            disabled={isLoading}
                            validation={usernameValidation}
                            onChangeValidation={setUsernameValidation}
                        />
                        <Input
                            label="Пароль"
                            type="password"
                            value={password}
                            placeholder="Пароль"
                            onChange={onChangePassword}
                            disabled={isLoading}
                            validation={passwordValidation}
                            onChangeValidation={setPasswordValidation}
                        />
                    </VStack>
                    <VStack gap="8">
                        {/* TODO понять как это применять */}
                        <Checkbox
                            wrapperHidden={false}
                            label="Сохранить вход"
                            type="checkbox"
                            direction="row-reverse"
                            checked={Boolean(remember)}
                            onChange={onChangeRemember}
                            disabled={isLoading}
                        />
                    </VStack>
                    <VStack gap="8" max>
                        <Button
                            disabled={isLoading}
                            onClick={loginHandler}
                            fullWidth
                        >
                            Войти
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onClickRegistrationButton}
                            fullWidth
                        >
                            Создать аккаунт
                        </Button>
                    </VStack>
                    {isError && (
                        <VStack>
                            <Text
                                variant="error"
                                text="Неверный логин или пароль"
                            />
                        </VStack>
                    )}
                </VStack>
            </Card>
        </DynamicModuleLoader>
    )
})
