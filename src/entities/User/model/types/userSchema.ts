export interface User {
    id: string
    username: string
    avatar?: string
    firstName: string
    lastName: string
}

export interface UserSchema {
    authData?: User
    _inited: boolean
}
