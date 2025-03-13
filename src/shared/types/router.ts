import { Location, RouteProps } from 'react-router-dom'

export type AppRouterProps = RouteProps & {
    authOnly?: boolean
    location?: Location
}
