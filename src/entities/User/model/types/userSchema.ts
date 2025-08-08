export type FolderType = {
    value: string
    title: string
}

export type DialogSettings = {
    dialogId: string
    folders: string[]
    isMuted: boolean
}

export interface User {
    id: string
    username: string
    avatar?: string
    firstName: string
    lastName: string
    dialogSettings?: DialogSettings[]
    folders?: FolderType[]
}

// TODO: вынесити потом  в нужно место
export interface Messages {
    id: string
    dialogId: string
    text: string
    senderId: string
    timestamp: string
    status: 'delivered' | 'read'
    attachments?: any[]
}

export interface UserSchema {
    authData?: User
    _inited: boolean
}
