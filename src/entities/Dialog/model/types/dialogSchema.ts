import { User } from '@/entities/User'

type isPinned = {
    isPinned: boolean
    order: number
}

export type DialogSettings = {
    unreadCount: number
    folders: string[]
    isMuted: boolean
    pinned?: Record<string, isPinned>
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
