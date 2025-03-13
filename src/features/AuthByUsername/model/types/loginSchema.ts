export interface LoginSchema {
    username: string
    password: string
    isLoading: boolean
    remember: boolean
    error?: string
}
