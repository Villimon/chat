import { FC, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
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
import { useLoginMutation } from '../../api/authApi'
import { Text } from '@/shared/ui/Text/Text'
import { getUserData } from '@/entities/User'
import { getRouteMain } from '@/shared/constants/routes'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

interface LoginFormProps {
    className?: string
}

export const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
    const username = useSelector(getUsername)
    const password = useSelector(getPassword)
    const remember = useSelector(getRemember)
    const isAuth = useSelector(getUserData)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [login, { isError, isLoading }] = useLoginMutation()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username,
            password,
            remember,
        },
        mode: 'onChange',
    })

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

    const loginHandler = useCallback(
        async (values: {
            username: string
            password: string
            remember: boolean
        }) => {
            const { password, remember, username } = values
            await login({ password, remember, username })
        },
        [login],
    )

    const onClickRegistrationButton = useCallback(() => {
        navigate('/registration')
    }, [navigate])

    if (isAuth) {
        return <Navigate to={getRouteMain()} />
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Card className={cls.card} padding="16">
                <form
                    style={{ width: '100%' }}
                    onSubmit={handleSubmit(loginHandler)}
                >
                    <VStack gap="16">
                        <VStack gap="8" max>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                disabled={isLoading}
                                rules={{
                                    required: 'Это поле обязательно',
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            onChangeUsername(value)
                                        }}
                                        label="Логин"
                                        autoFocus
                                        placeholder="Логин"
                                        error={errors.username?.message}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                disabled={isLoading}
                                rules={{
                                    required: 'Это поле обязательно',
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            onChangePassword(value)
                                        }}
                                        label="Пароль"
                                        type="password"
                                        placeholder="Пароль"
                                        error={errors.password?.message}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </VStack>
                        <VStack gap="8">
                            {/* TODO понять как это применять */}
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                disabled={isLoading}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            onChangeRemember(value)
                                        }}
                                        wrapperHidden={false}
                                        label="Сохранить вход"
                                        type="checkbox"
                                        direction="row-reverse"
                                        checked={Boolean(remember)}
                                        error={errors.remember?.message}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </VStack>
                        <VStack gap="8" max>
                            <Button
                                disabled={isLoading}
                                onClick={handleSubmit(loginHandler)}
                                fullWidth
                                type="submit"
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
                </form>
            </Card>
        </DynamicModuleLoader>
    )
})
