import { useLocation } from 'react-router-dom'

interface UseNavigateBackParams {
    hash?: string
}

export const useNavigateBack = ({ hash }: UseNavigateBackParams) => {
    const location = useLocation()

    const getCleanUrl = (): string => {
        return `${location.pathname}${hash || ''}${location.search}`
    }

    return getCleanUrl()
}
