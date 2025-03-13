import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { getRouteLogin } from '@/shared/constants/routes'
import { getUserData } from '@/entities/User'

interface RequierAuthProps {
    children: ReactNode
}

export const RequierAuth = ({ children }: RequierAuthProps) => {
    const isAuth = useSelector(getUserData)

    if (!isAuth) {
        return <Navigate to={getRouteLogin()} replace />
    }

    return children
}
