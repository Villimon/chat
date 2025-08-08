import { User } from '@/entities/User'

export type DialogSettings = {
    unreadCount: number
    folders: string[]
    isMuted: boolean
    isPinned?: Record<string, string>
}

export interface Dialog {
    id: string
    type: 'private' | 'group' | 'channel'
    participants: string[] // ID участников
    title?: string // Автогенерация для приватных чатов
    lastMessage: {
        text: string
        senderId: string
        timestamp: string
    }
    avatar?: string
    interlocutor?: User
    userSettings: DialogSettings
}

export interface DialogDto {
    currentPage: number
    totalPages: number
    totalItems: number
    data: Dialog[]
}
