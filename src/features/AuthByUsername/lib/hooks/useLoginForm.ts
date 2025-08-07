import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginActions } from '../../model/slice/authSlice'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch '
import { useLoginMutation } from '../../api/authApi'

interface UseLoginFromProps {
    login: ReturnType<typeof useLoginMutation>[0]
}

interface ReturnLoginFromProps {
    onChangeUsername: (value: string) => void
    onChangePassword: (value: string) => void
    onChangeRemember: (value: boolean) => void
    loginHandler: (values: {
        username: string
        password: string
        remember: boolean
    }) => Promise<void>
    onClickRegistrationButton: () => void
}

export const useLoginForm = ({
    login,
}: UseLoginFromProps): ReturnLoginFromProps => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
            await login({ password, remember, username }).unwrap()
        },
        [login],
    )

    const onClickRegistrationButton = useCallback(() => {
        navigate('/registration')
    }, [navigate])

    return {
        onChangeUsername,
        onChangePassword,
        onChangeRemember,
        loginHandler,
        onClickRegistrationButton,
    }
}
